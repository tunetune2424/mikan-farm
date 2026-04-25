# 伊佐みかん園

沖縄・やんばるで三代続くみかん農家のWebサイト。タンカン・シークヮーサーを産地直送で届けるブランドサイトです。

**[→ デモサイト（Vercel）](https://mikan-farm.vercel.app/)**

## 技術スタック

| 種別 | 技術 |
|------|------|
| フレームワーク | React 19 + Vite |
| スタイリング | カスタムCSS（デザイントークン） |
| フォント | Noto Serif JP / Playfair Display |
| メール送信 | EmailJS |
| デプロイ | Vercel |

## セットアップ

```bash
npm install
cp .env.example .env   # EmailJSのキーを設定
npm run dev
```

### 環境変数

`.env` に以下を設定（EmailJS設定後）：

```
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
```

## ページ構成

シングルページスクロール構成（React Router なし）：

| セクション | 内容 |
|-----------|------|
| Hero | メインビジュアル・キャッチコピー |
| About | 農園紹介・三代の歴史 |
| Products | タンカン・シークヮーサー・温州みかん |
| Philosophy | こだわり（土・手摘み・即日出荷） |
| Contact | お問い合わせフォーム（EmailJS） |

## ビルド

```bash
npm run build
npm run preview
```
