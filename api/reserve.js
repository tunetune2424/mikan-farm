import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

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

  return res.status(200).json({ status: 'ok' })
}
