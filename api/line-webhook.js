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

async function cancelReservation(id) {
  return supabase
    .from('reservations')
    .update({ status: 'cancelled', cancelled_at: new Date().toISOString() })
    .eq('id', id)
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

    if (text === '予約一覧' && userId === process.env.LINE_OWNER_USER_ID) {
      const today = new Date().toISOString().slice(0, 10)
      const { data: reservations } = await supabase
        .from('reservations')
        .select('date, time_slot, arrival_time, adults, children, name, tel')
        .eq('status', 'active')
        .gte('date', today)
        .order('date', { ascending: true })
        .order('time_slot', { ascending: true })

      if (!reservations || reservations.length === 0) {
        await replyMessage(replyToken, '今後の予約はありません。')
        continue
      }

      const lines = reservations.map((r, i) => {
        const [, m, d] = r.date.split('-')
        return `${i + 1}. 📅 ${Number(m)}月${Number(d)}日 ${r.time_slot} ${r.arrival_time}〜\n   👤 ${r.name}（大人${r.adults}名・子ども${r.children}名）\n   📞 ${r.tel}`
      })

      await replyMessage(replyToken, `【予約一覧】${reservations.length}件\n\n${lines.join('\n\n')}`)
      continue
    }

    if (text === 'キャンセル') {
      const today = new Date().toISOString().slice(0, 10)
      const { data: reservations } = await supabase
        .from('reservations')
        .select('id, date, time_slot, arrival_time, adults, children')
        .eq('line_user_id', userId)
        .eq('status', 'active')
        .gte('date', today)
        .order('date', { ascending: true })

      if (!reservations || reservations.length === 0) {
        await replyMessage(replyToken, 'キャンセルできる予約はありません。')
        continue
      }

      if (reservations.length === 1) {
        const r = reservations[0]
        const [y, m, d] = r.date.split('-')
        await replyMessage(replyToken, `【キャンセル確認】\n\n📅 ${y}年${Number(m)}月${Number(d)}日\n🕐 ${r.time_slot} / ${r.arrival_time}〜\n👥 大人${r.adults}名・子ども${r.children}名\n\nキャンセルするには「キャンセル確認」と送ってください。`)
        continue
      }

      const lines = reservations.map((r, i) => {
        const [y, m, d] = r.date.split('-')
        return `${i + 1}. 📅 ${y}年${Number(m)}月${Number(d)}日 ${r.time_slot} ${r.arrival_time}〜`
      })
      await replyMessage(replyToken, `キャンセルしたい予約の番号を「キャンセル 1」のように送ってください。\n\n${lines.join('\n')}`)
      continue
    }

    if (text === 'キャンセル確認') {
      const today = new Date().toISOString().slice(0, 10)
      const { data: reservations } = await supabase
        .from('reservations')
        .select('id, date, time_slot')
        .eq('line_user_id', userId)
        .eq('status', 'active')
        .gte('date', today)
        .order('date', { ascending: true })

      if (!reservations || reservations.length === 0) {
        await replyMessage(replyToken, 'キャンセルできる予約はありません。')
        continue
      }

      if (reservations.length > 1) {
        const lines = reservations.map((r, i) => {
          const [y, m, d] = r.date.split('-')
          return `${i + 1}. 📅 ${y}年${Number(m)}月${Number(d)}日 ${r.time_slot}`
        })
        await replyMessage(replyToken, `予約が複数あります。番号を指定してください。\n\n${lines.join('\n')}\n\n例：キャンセル 1`)
        continue
      }

      const reservation = reservations[0]
      const { error } = await cancelReservation(reservation.id)

      if (error) {
        await replyMessage(replyToken, 'キャンセルに失敗しました。しばらく経ってからもう一度お試しください。')
        continue
      }

      const [y, m, d] = reservation.date.split('-')
      await replyMessage(replyToken, `✅ 予約をキャンセルしました。\n\n📅 ${y}年${Number(m)}月${Number(d)}日 ${reservation.time_slot}`)
      continue
    }

    const cancelMatch = text.match(/^キャンセル\s+(\d+)$/)
    if (cancelMatch) {
      const index = parseInt(cancelMatch[1], 10) - 1
      const today = new Date().toISOString().slice(0, 10)
      const { data: reservations } = await supabase
        .from('reservations')
        .select('id, date, time_slot')
        .eq('line_user_id', userId)
        .eq('status', 'active')
        .gte('date', today)
        .order('date', { ascending: true })

      if (!reservations || index < 0 || index >= reservations.length) {
        await replyMessage(replyToken, '指定した番号の予約が見つかりませんでした。')
        continue
      }

      const reservation = reservations[index]
      const { error } = await cancelReservation(reservation.id)

      if (error) {
        await replyMessage(replyToken, 'キャンセルに失敗しました。しばらく経ってからもう一度お試しください。')
        continue
      }

      const [y, m, d] = reservation.date.split('-')
      await replyMessage(replyToken, `✅ 予約をキャンセルしました。\n\n📅 ${y}年${Number(m)}月${Number(d)}日 ${reservation.time_slot}`)
      continue
    }

    if (text === '予約確認') {
      const today = new Date().toISOString().slice(0, 10)
      const { data: reservations } = await supabase
        .from('reservations')
        .select('date, time_slot, arrival_time, adults, children')
        .eq('line_user_id', userId)
        .eq('status', 'active')
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
