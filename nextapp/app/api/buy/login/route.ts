import { NextRequest, NextResponse } from 'next/server'
import { findByPhone } from '@/lib/store'

export async function POST(req: NextRequest) {
  const form = await req.formData()
  const phone    = form.get('phone')    as string
  const password = form.get('password') as string

  const dist = findByPhone(phone)

  if (!dist || dist.password !== password) {
    return NextResponse.json({ error: 'invalid_credentials' })
  }
  if (dist.status === 'pending')  return NextResponse.json({ error: 'pending' })
  if (dist.status === 'rejected') return NextResponse.json({ error: 'rejected' })

  return NextResponse.json({ redirect: `/distributor/${dist.id}` })
}
