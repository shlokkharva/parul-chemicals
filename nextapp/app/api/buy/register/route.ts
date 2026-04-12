import { NextRequest, NextResponse } from 'next/server'
import { addDistributor, findByPhone } from '@/lib/store'

export async function POST(req: NextRequest) {
  const form = await req.formData()
  const phone = form.get('phone') as string

  if (findByPhone(phone)) {
    return NextResponse.json({ error: 'phone_exists' })
  }

  addDistributor({
    name:     form.get('name')     as string,
    phone,
    email:    form.get('email')    as string,
    company:  form.get('company')  as string,
    location: form.get('location') as string,
    product:  form.get('product')  as string,
    quantity: form.get('quantity') as string,
  })

  return NextResponse.json({ success: true })
}
