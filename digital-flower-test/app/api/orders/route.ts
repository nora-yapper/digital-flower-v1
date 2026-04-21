import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const ordersFilePath = path.join(process.cwd(), 'data', 'orders.json')

async function readOrders() {
  try {
    const data = await fs.readFile(ordersFilePath, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

async function writeOrders(orders: unknown[]) {
  await fs.mkdir(path.dirname(ordersFilePath), { recursive: true })
  await fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2))
}

export async function GET() {
  const orders = await readOrders()
  return NextResponse.json(orders)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const orders = await readOrders()

  const orderNumber = `#${String(orders.length + 101).padStart(3, '0')}`

  const order = {
    orderNumber,
    createdAt: new Date().toISOString(),
    paymentMethod: body.paymentMethod,
    customerName: body.customerName ?? null,
    customerPhone: body.customerPhone ?? null,
    cart: body.cart,
    total: body.total,
    language: body.language,
    status: 'pending',
  }

  orders.push(order)
  await writeOrders(orders)

  return NextResponse.json({ orderNumber }, { status: 201 })
}
