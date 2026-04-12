import { NextRequest, NextResponse } from 'next/server'
import { findById } from '@/lib/store'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const dist = findById(params.id)
  if (!dist) return NextResponse.json({ error: 'not_found' }, { status: 404 })
  
  // Exclude password
  const { password, ...distWithoutPassword } = dist
  return NextResponse.json({ distributor: distWithoutPassword })
}
