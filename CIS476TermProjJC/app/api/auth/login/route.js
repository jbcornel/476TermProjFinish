import prisma from '@/lib/prisma'
import argon2 from 'argon2'
import crypto from 'crypto'
import sessionManager from '@/lib/sessionManager'

export async function POST(req) {
  const body = await req.json()
  const { email, password } = body

  try {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 })
    }

    const isMatch = await argon2.verify(user.password, password)
    if (!isMatch) {
      return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 401 })
    }

    const token = crypto.randomBytes(16).toString('hex')
    sessionManager.createSession(parseInt(user.id), { token })
    
    return new Response(JSON.stringify({ token, userId: user.id, email: user.email }), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
}
