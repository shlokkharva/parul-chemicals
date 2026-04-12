// In-memory store — same behavior as the original Express app
// Replace with a real DB (MongoDB/Postgres) for production

import crypto from 'crypto'

export interface Distributor {
  id: string
  name: string
  phone: string
  email: string
  company: string
  location: string
  product: string
  quantity: string
  status: 'pending' | 'approved' | 'rejected'
  appliedAt: string
  approvedAt: string | null
  password: string | null
}

// Global singleton — persists for the lifetime of the Node.js process
const globalStore = global as typeof globalThis & { distributors?: Distributor[] }
if (!globalStore.distributors) globalStore.distributors = []

export const distributors = () => globalStore.distributors as Distributor[]

export function addDistributor(data: Omit<Distributor, 'id' | 'status' | 'appliedAt' | 'approvedAt' | 'password'>) {
  const newDist: Distributor = {
    id: crypto.randomUUID(),
    ...data,
    status: 'pending',
    appliedAt: new Date().toISOString(),
    approvedAt: null,
    password: null,
  }
  globalStore.distributors!.push(newDist)
  return newDist
}

export function findByPhone(phone: string) {
  return globalStore.distributors!.find(d => d.phone === phone) || null
}

export function findById(id: string) {
  return globalStore.distributors!.find(d => d.id === id) || null
}

export function generatePassword(len = 9) {
  return crypto.randomBytes(len).toString('base64').replace(/[^a-zA-Z0-9]/g, '').substring(0, len)
}

export function approveDistributor(id: string) {
  const d = findById(id)
  if (!d) return null
  d.status = 'approved'
  d.approvedAt = new Date().toISOString()
  d.password = generatePassword()
  return d
}

export function rejectDistributor(id: string) {
  const d = findById(id)
  if (!d) return null
  d.status = 'rejected'
  return d
}

export function deleteDistributor(id: string) {
  globalStore.distributors = globalStore.distributors!.filter(d => d.id !== id)
}
