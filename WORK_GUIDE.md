# 伊佐みかん園 予約システム｜作業概要

最終更新：2026-06-10

---

## 全体像

### Instagram からの動線（メイン）

```
Instagram プロフィールリンク
  ↓
/calendar（空き確認）
  ↓
  ├─【LINEで予約する（おすすめ）】─────────────────────────────┐
  │  予約後のキャンセル・当日連絡がスムーズ                      │
  │  ↓ LINE 友達追加ページへ                                    │
  │  友達追加（follow イベント発火）                             │
  │  ↓ GAS が即座に LIFF URL を push 送信                       │
  │  LIFF フォームが開く（UserID 自動取得）                      │
  │  ↓ 予約送信                                                 │
  │  GAS → 確認メッセージを LINE で自動送信 + 農園主に通知       │
  └──────────────────────────────────────────────────────────┘

  └─【Webフォームで予約する】─────────────────────────────────┐
     （LINE を使いたくない人向け・テキストリンク風で小さく表示） │
     ↓ /reserve（通常 Web フォーム）                           │
     POST送信（名前・電話・メール・日程・人数）                  │
     GAS → 農園主に通知                                        │
     完了画面でLINE友達追加を案内（任意）                       │
     └──────────────────────────────────────────────────────┘
```

### LINE リッチメニューからの動線（リピーター・既存友達）

```
LINE リッチメニュー
  ├─「予約する」→ /calendar → 上記と同じ
  └─「予約確認」→ 電話番号入力 → 予約と LINE UserID を紐付け
```

---

## カレンダーページ（/calendar）のボタン構成

```
┌──────────────────────────────────────┐
│  🟢 LINE で予約する（おすすめ）       │  ← 大きく・緑・目立つ
│  予約後のキャンセル・当日連絡がスムーズ │  ← サブテキスト
└──────────────────────────────────────┘

        Webフォームで予約する            ← 小さめ・テキストリンク
```

---

## LINE アカウントの役割

友達追加は任意だが、追加すると以下が使える：

| 機能 | 説明 |
|------|------|
| キャンセル・変更 | LINE で「キャンセル」と送るだけ（自動処理） |
| 農園の最新情報 | 天候キャンセル・お知らせを配信 |
| 当日の連絡 | 道案内・遅延連絡などスムーズ |
| 問い合わせ | いつでも気軽に送れる |

### LINE リッチメニュー（3ボタン）

```
┌─────────────┬─────────────┬─────────────┐
│  📅 予約する │ 📋 予約確認  │ 🎟 クーポン  │
│ （/calendar）│（電話番号照合）│（画像を送信）│
└─────────────┴─────────────┴─────────────┘
```

**クーポンボタンの動作：**
- タップ → GAS がスプレッドシートで使用済みチェック
- 未使用 → クーポン画像を LINE メッセージで送信 → 使用済みとして記録
- 使用済み → 「このクーポンはすでにご利用済みです🍊」と返信
- 農園スタッフが提示された画面を見て割引対応（1人1回限り）

**スプレッドシートに「クーポン管理」シートを追加：**

| 列 | 内容 |
|---|---|
| A | LINE UserID |
| B | 使用日時 |

**GAS 実装：**

```javascript
const SHEET_COUPONS = 'クーポン管理';

function handleCoupon(userId, replyToken) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_COUPONS);
  const data = sheet.getDataRange().getValues();
  const used = data.some(row => row[0] === userId);

  if (used) {
    replyMessage(replyToken, 'このクーポンはすでにご利用済みです🍊\nまたのご来園をお待ちしております！');
    return;
  }

  // 画像メッセージで送信
  replyImageMessage(replyToken, COUPON_IMAGE_URL);
  // 使用済みとして記録
  const now = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy-MM-dd HH:mm');
  sheet.appendRow([userId, now]);
}
```

- `COUPON_IMAGE_URL` はクーポン画像を公開 URL に置いておく（Google Drive の共有リンク等）
- クーポン画像は農園主が差し替え可能な設計にする
- `setupSpreadsheet()` に「クーポン管理」シートの作成処理も追加する

### 予約確認フロー（LINE と予約の紐付け）

```
友達追加後に「予約確認」ボタンをタップ
  ↓
「ご予約時のお電話番号を入力してください」
  ↓
090-XXXX-XXXX と送信
  ↓
GAS がスプレッドシートで照合
  ↓
「R-001 / 11月15日 午前 / 田中様の予約を確認しました🍊
 以後 LINE でご連絡します。」
  ↓
LINE UserID と予約が紐付け完了 → 自動キャンセル等が使えるようになる
```

---

## 現在の状態

| 項目 | 状態 |
|------|------|
| react-router-dom | ✅ インストール済み（v7） |
| App.jsx のルーティング | ❌ 未対応（BrowserRouter なし） |
| /calendar ページ | ❌ 未作成 |
| /reserve ページ | ❌ 未作成 |
| vercel.json | ❌ 未作成 |
| .env（環境変数） | ❌ 未設定 |
| Google Cloud APIキー | ❌ 未取得（外部作業） |
| Googleカレンダー | ❌ 未作成（外部作業） |
| GAS | ❌ 未設定（外部作業） |
| 農園主 LINE UserID | ❌ 未取得（外部作業） |

---

## コード実装タスク（このリポジトリ内）

### 1. main.jsx を更新

`BrowserRouter` でアプリ全体をラップする。

```jsx
// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

---

### 2. App.jsx を更新

`Routes` で `/`・`/calendar`・`/reserve` を振り分ける。

```jsx
// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Products from './components/Products'
import Philosophy from './components/Philosophy'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CalendarPage from './pages/CalendarPage'
import ReservePage from './pages/ReservePage'

function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Products />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/reserve" element={<ReservePage />} />
    </Routes>
  )
}

export default App
```

---

### 3. vercel.json を追加（ルートに作成）

SPA用：`/calendar` や `/reserve` に直接アクセスされたとき `index.html` に転送する設定。

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

---

### 4. CalendarPage.jsx を作成

**参照:** Obsidian の `05_カレンダーページ_React実装.md` にベースコードあり（ボタン部分は下記に合わせて変更）。

保存先: `src/pages/CalendarPage.jsx`

機能:
- Googleカレンダー API から開園日の午前・午後空き状況を取得
- API未設定時はデモデータを表示
- 「LINEで予約する（おすすめ）」→ LINE 友達追加ページへ（`VITE_LINE_ACCOUNT_URL`）
- 「Webフォームで予約する」→ `/reserve` ページへ（テキストリンク・小さめ）

**ボタン部分の実装イメージ:**

```jsx
<div className="cal-cta">
  <a href={LINE_ACCOUNT_URL} className="cal-btn cal-btn-line">
    <LineIcon />
    LINEで予約する
    <span className="cal-btn-badge">おすすめ</span>
  </a>
  <p className="cal-btn-sub">予約後のキャンセル・当日連絡がスムーズ</p>
  <Link to="/reserve" className="cal-link-web">Webフォームで予約する</Link>
</div>
```

---

### 5. CalendarPage.css を作成

**参照:** 同上（`05_カレンダーページ_React実装.md` にコードあり）

保存先: `src/pages/CalendarPage.css`

---

### 6. ReservePage.jsx を作成

保存先: `src/pages/ReservePage.jsx`

**ステップ式フォーム:**
1. 日付選択
2. 時間帯（午前 / 午後）
3. 来園時間（午前: 9:00/10:00/11:00、午後: 13:00/14:00/15:00/16:00）
4. 人数（大人 / 子供 の ±ボタン）
5. 名前・電話番号・メールアドレス
6. 送信 → GAS の URL に POST → 完了画面

**完了画面の構成:**

```
✅ ご予約を受け付けました
当日お気をつけてお越しください🍊

────────────────────────────────
📱 LINE でもっと便利に（友達追加は無料・任意）

✔ キャンセル・変更がかんたん
✔ 農園の最新情報をお届け
✔ 当日の連絡もスムーズ
✔ 気軽に問い合わせできる

[ 友達追加する ]  ← 緑の LINE ボタン
────────────────────────────────

電話・メールでのお問い合わせ
📞 XXX-XXXX-XXXX
📧 example@example.com
```

**GASへのPOSTデータ形式:**

```json
{
  "source": "web",
  "date": "2026-11-15",
  "timeSlot": "午前",
  "arrivalTime": "10:00",
  "adults": 2,
  "children": 1,
  "name": "田中 太郎",
  "tel": "090-XXXX-XXXX",
  "email": "tanaka@example.com"
}
```

**環境変数（.env から取得）:**

```js
const GAS_URL          = import.meta.env.VITE_GAS_URL          || ''
const LINE_ACCOUNT_URL = import.meta.env.VITE_LINE_ACCOUNT_URL || '#'
const PHONE            = import.meta.env.VITE_FARM_PHONE        || ''
const EMAIL            = import.meta.env.VITE_FARM_EMAIL        || ''
```

---

### 7. ReservePage.css を作成

保存先: `src/pages/ReservePage.css`

---

### 8. Nav.jsx に「空き確認・予約」リンクを追加（任意）

```jsx
import { Link } from 'react-router-dom'
// Nav のリンク一覧に追加
<Link to="/calendar">空き確認・予約</Link>
```

---

### 9. .env に環境変数を追加

`.env` に以下を追記（値は外部作業で取得してから入力）:

```
VITE_GOOGLE_API_KEY=（Google Cloud Console で取得）
VITE_CALENDAR_ID=（GoogleカレンダーのID）
VITE_GAS_URL=（GASデプロイ後のURL）
VITE_LINE_ACCOUNT_URL=https://line.me/R/ti/p/@（LINE公式アカウントID）
VITE_FARM_PHONE=（農園の電話番号）
VITE_FARM_EMAIL=（農園のメールアドレス）
```

> `.env` は `.gitignore` に入っていることを確認すること（APIキー漏洩防止）

`.env.example` にも同じキー名（値は空）を追記する。

---

## 外部設定タスク（コード実装とは別に必要）

### Google Cloud Console
1. プロジェクト作成
2. Google Calendar API を有効化
3. APIキーを作成（HTTPリファラー制限: Vercel の URL のみ）
4. 取得した APIキーを `.env` の `VITE_GOOGLE_API_KEY` に設定

### Googleカレンダー
1. カレンダーを新規作成（名前例: 「みかん狩り開園カレンダー」）
2. 設定 → 「一般公開」に変更
3. カレンダーID（`...@group.calendar.google.com` 形式）をコピー
4. `.env` の `VITE_CALENDAR_ID` に設定

### GAS（Google Apps Script）
1. 新しい GAS プロジェクトを作成
2. 下記のコード（Code.gs）を貼り付け
3. 定数（LINE_TOKEN, SPREADSHEET_ID, CALENDAR_ID, OWNER_USER_ID）を書き換え
4. `setupSpreadsheet()` を実行してシートを自動作成
5. デプロイ → 「ウェブアプリ」として公開 → URLを取得
6. 取得した URL を `.env` の `VITE_GAS_URL` に設定
7. LINE Developers の Webhook URL にも登録

**GAS Code.gs の修正ポイント:**

既存の GAS コード（Obsidian `01_GASコード.md`）は LIFF 用に書かれている。以下の変更が必要。

**① doPost を修正（Web フォーム対応）**

```javascript
function doPost(e) {
  if (!e || !e.postData) return ok();
  try {
    const body = JSON.parse(e.postData.contents);

    // Webフォームからの予約
    if (body.source === 'web') {
      handleNewReservation(body);
      return ok();
    }

    // LINEからのメッセージ（予約確認・キャンセル等）
    (body.events || []).forEach(event => {
      if (event.type === 'message' && event.message.type === 'text') {
        handleMessage(event.source.userId, event.message.text.trim(), event.replyToken);
      } else if (event.type === 'postback') {
        handlePostback(event.source.userId, event.postback.data, event.replyToken);
      }
    });
  } catch (err) {
    console.log('doPost エラー: ' + err.toString());
  }
  return ok();
}
```

**② handleNewReservation を修正**
- お客さんへの `pushMessage` は削除（userId がないため）
- メールアドレスをスプレッドシートに追加保存
- 農園主への通知にメール・電話番号を含める

**③ follow イベントの処理を追加（友達追加直後に LIFF URL を送信）**

```javascript
// doPost 内の LINE イベント処理に追加
} else if (event.type === 'follow') {
  handleFollow(event.source.userId);
}

function handleFollow(userId) {
  pushMessage(userId,
    `伊佐みかん園の LINE へようこそ🍊\n\n` +
    `ご予約はこちらから：\n` +
    `${LIFF_URL}\n\n` +
    `キャンセル・変更・お問い合わせも\nいつでもこちらへどうぞ。`
  );
}
```

GAS の定数に `LIFF_URL` を追加する：

```javascript
const LIFF_URL = '（LINE Developers で取得した LIFF URL）';
```

**④ handleMessage に「予約確認」フローを追加**

```javascript
if (message === '予約確認') {
  replyMessage(replyToken, 'ご予約時のお電話番号を入力してください（例：090-1234-5678）');
  // PropertiesService でユーザーの状態を「電話番号待ち」にセット
  PropertiesService.getScriptProperties().setProperty(`state_${userId}`, 'waiting_tel');
  return;
}
// 電話番号が送られてきたら照合・紐付け
const state = PropertiesService.getScriptProperties().getProperty(`state_${userId}`);
if (state === 'waiting_tel') {
  linkReservationByTel(userId, message, replyToken);
  PropertiesService.getScriptProperties().deleteProperty(`state_${userId}`);
  return;
}
```

### 重複予約の防止

**① GAS：Web フォーム受信時に重複チェック（ハード防止）**

同じ電話番号 × 同じ日程の予約がスプレッドシートに既にある場合、エラーを返す。

```javascript
function handleNewReservation(data) {
  const { tel, date, timeSlot } = data;

  // 重複チェック
  if (isDuplicateReservation(tel, date)) {
    return { status: 'duplicate' }; // フォーム側でエラー表示
  }
  // 以降は通常の予約処理...
}

function isDuplicateReservation(tel, date) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_RESERVATIONS);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;
  const data = sheet.getRange(2, 1, lastRow - 1, 12).getValues();
  return data.some(row => row[9] === tel && row[2] === date && row[11] === '確定');
}
```

フォーム（ReservePage.jsx）側は GAS のレスポンスが `{ status: 'duplicate' }` のとき
「この日程はすでにご予約済みです」とエラー表示する。

**② GAS：予約確認フロー（LINE 紐付け時）でも重複を通知**

電話番号照合で既存予約が見つかったとき、リッチメニューの「予約する」から
再予約しようとしている可能性があるため、予約内容を提示してから進む。

---

### LINE / LIFF
1. 農園主の LINE に「myid」と送信 → UserID を確認 → GAS の `OWNER_USER_ID` に設定
2. LINE 公式アカウントの友達追加 URL を確認: `https://line.me/R/ti/p/@アカウントID`
   → `.env` の `VITE_LINE_ACCOUNT_URL` に設定
3. LINE Developers で LIFF アプリを登録
   - エンドポイント URL: `https://（Vercel の URL）/reserve`
   - スコープ: `profile` にチェック
   - LIFF URL（`https://liff.line.me/XXXXX`）を取得
   → GAS の `LIFF_URL` 定数に設定
4. LINE Developers の Webhook URL に GAS のデプロイ URL を登録

### Vercel
1. Vercel の「Environment Variables」に `.env` の4変数を同じ内容で登録
2. デプロイ後の公開 URL を確認

### Instagram
1. プロフィールリンクに `/calendar` のフル URL を設定
   例: `https://mikan-farm-xxx.vercel.app/calendar`

---

## 実装の推奨順序

1. **外部設定: Google Cloud & Googleカレンダー** → APIキー・カレンダーID取得
2. **外部設定: LINE UserID取得**
3. **外部設定: GAS作成・デプロイ** → GAS URL取得
4. **コード: main.jsx / App.jsx / vercel.json** → ルーティング基盤
5. **コード: CalendarPage.jsx + .css** → 空き確認ページ
6. **コード: ReservePage.jsx + .css** → 予約フォームページ
7. **コード: .env に全変数を入力**
8. **動作確認**: `npm run dev` で `/calendar`・`/reserve` を確認
9. **Vercel デプロイ** → 環境変数を Vercel に登録 → 本番確認
10. **Instagram リンク更新**

---

## Obsidian 設計資料の場所

| ファイル | 内容 |
|---------|------|
| `05_カレンダーページ_React実装.md` | CalendarPage.jsx / CalendarPage.css の完全なコード |
| `01_GASコード.md` | GAS Code.gs の完全なコード（修正箇所は上記参照） |
| `伊佐みかん園_LINE設定.md` | APIキー・トークン等の記録場所 |
