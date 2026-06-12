import { createClient } from '@supabase/supabase-js'
import { createHmac } from 'crypto'

export const config = {
  api: { bodyParser: false },
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', chunk => { data += chunk })
    req.on('end', () => resolve(data))
    req.on('error', reject)
  })
}

async function replyMessage(replyToken, text) {
  try {
    await fetch('https://api.line.me/v2/bot/message/reply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        replyToken,
        messages: [{ type: 'text', text }],
      }),
    })
  } catch {
    // 返信失敗はリクエスト処理に影響させない
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const rawBody = await getRawBody(req)

  const signature = req.headers['x-line-signature']
  const hash = createHmac('SHA256', process.env.LINE_CHANNEL_SECRET)
    .update(rawBody)
    .digest('base64')

  if (hash !== signature) {
    return res.status(401).end()
  }

  const { events = [] } = JSON.parse(rawBody)

  for (const event of events) {
    if (event.type !== 'message' || event.message.type !== 'text') continue

    const text = event.message.text.trim()
    const userId = event.source.userId
    const replyToken = event.replyToken

    if (text === 'キャンセル') {
      const today = new Date().toISOString().slice(0, 10)
      const { data: reservations } = await supabase
        .from('reservations')
        .select('date, time_slot, arrival_time')
        .eq('line_user_id', userId)
        .gte('date', today)
        .order('date', { ascending: true })

      if (!reservations || reservations.length === 0) {
        await replyMessage(replyToken, 'キャンセルできる予約はありません。')
        continue
      }

      const lines = reservations.map(r => {
        const [y, m, d] = r.date.split('-')
        return `📅 ${y}年${Number(m)}月${Number(d)}日 ${r.time_slot} ${r.arrival_time}〜`
      })

      await replyMessage(replyToken, `キャンセルしたい予約の日付を以下の形式で送ってください。\n\n例：キャンセル 2026-06-15\n\n【予約一覧】\n${lines.join('\n')}`)
      continue
    }

    const cancelMatch = text.match(/^キャンセル\s+(\d{4}-\d{2}-\d{2})$/)
    if (cancelMatch) {
      const date = cancelMatch[1]
      const { data: reservation } = await supabase
        .from('reservations')
        .select('id, date, time_slot')
        .eq('line_user_id', userId)
        .eq('date', date)
        .maybeSingle()

      if (!reservation) {
        await replyMessage(replyToken, 'その日付の予約が見つかりませんでした。')
        continue
      }

      const { error } = await supabase
        .from('reservations')
        .delete()
        .eq('id', reservation.id)

      if (error) {
        await replyMessage(replyToken, 'キャンセルに失敗しました。しばらく経ってからもう一度お試しください。')
        continue
      }

      const [y, m, d] = date.split('-')
      await replyMessage(replyToken, `✅ 予約をキャンセルしました。\n\n📅 ${y}年${Number(m)}月${Number(d)}日 ${reservation.time_slot}`)
      continue
    }

    if (text === '予約確認') {
      const today = new Date().toISOString().slice(0, 10)
      const { data: reservations } = await supabase
        .from('reservations')
        .select('date, time_slot, arrival_time, adults, children')
        .eq('line_user_id', userId)
        .gte('date', today)
        .order('date', { ascending: true })

      if (!reservations || reservations.length === 0) {
        await replyMessage(replyToken, '現在、有効なご予約はありません。')
        continue
      }

      const lines = reservations.map(r => {
        const [y, m, d] = r.date.split('-')
        return `📅 ${y}年${Number(m)}月${Number(d)}日\n🕐 ${r.time_slot} / ${r.arrival_time}〜\n👥 大人${r.adults}名・子ども${r.children}名`
      })

      await replyMessage(replyToken, `ご予約内容\n\n${lines.join('\n\n')}\n\nキャンセルする場合は「キャンセル」と打ってください。`)
    }
  }

  return res.status(200).end()
}
