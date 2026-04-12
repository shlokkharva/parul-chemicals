import { NextRequest, NextResponse } from 'next/server'
import { approveDistributor, rejectDistributor, deleteDistributor } from '@/lib/store'

export async function POST(req: NextRequest) {
  const { action, id } = await req.json()
  let result = null

  if (action === 'approve') result = approveDistributor(id)
  else if (action === 'reject') result = rejectDistributor(id)
  else if (action === 'delete') {
    deleteDistributor(id)
    return NextResponse.json({ success: true, deleted: true })
  }

  if (!result) return NextResponse.json({ error: 'not_found' }, { status: 404 })

  return NextResponse.json({ success: true, distributor: result })
}
