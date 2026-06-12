import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function sendLineMessage(to, text) {
  if (!process.env.LINE_CHANNEL_ACCESS_TOKEN || !to) return
  try {
    await fetch('https://api.line.me/v2/bot/message/push', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ to, messages: [{ type: 'text', text }] }),
    })
  } catch {
    // 通知失敗は予約処理に影響させない
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  let body
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  } catch {
    return res.status(400).json({ error: 'Invalid JSON' })
  }

  const { date, timeSlot, arrivalTime, adults, children, name, tel, email, source, userId } = body

  const { data: existing, error: checkError } = await supabase
    .from('reservations')
    .select('id')
    .eq('email', email)
    .eq('date', date)
    .eq('status', 'active')
    .maybeSingle()

  if (checkError) {
    return res.status(500).json({ error: 'Database error' })
  }

  if (existing) {
    return res.status(200).json({ status: 'duplicate' })
  }

  const { error: insertError } = await supabase.from('reservations').insert({
    date,
    time_slot: timeSlot,
    arrival_time: arrivalTime,
    adults,
    children,
    name,
    tel,
    email,
    source: source || 'web',
    line_user_id: userId || null,
  })

  if (insertError) {
    return res.status(500).json({ error: 'Database error' })
  }

  const [y, m, d] = date.split('-')
  const dateStr = `${y}年${Number(m)}月${Number(d)}日`

  const ownerMsg = `【予約通知】新しいご予約が入りました\n\n📅 ${dateStr}\n🕐 ${timeSlot} / ${arrivalTime}〜\n👥 大人${adults}名・子ども${children}名\n\nお名前: ${name}\n電話: ${tel}\nメール: ${email}`

  const notifPromises = [
    sendLineMessage(process.env.LINE_OWNER_USER_ID, ownerMsg),
  ]

  if (userId) {
    const customerMsg = `【予約完了】伊佐みかん園\n\nご予約を受け付けました🍊\n\n📅 ${dateStr}\n🕐 ${timeSlot} / ${arrivalTime}〜\n👥 大人${adults}名・子ども${children}名\n\n当日お気をつけてお越しください。`
    notifPromises.push(sendLineMessage(userId, customerMsg))
  }

  await Promise.allSettled(notifPromises)

  return res.status(200).json({ status: 'ok' })
}
