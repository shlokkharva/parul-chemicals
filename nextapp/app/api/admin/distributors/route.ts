import { NextResponse } from 'next/server'
import { distributors } from '@/lib/store'

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json({ distributors: distributors() })
}
