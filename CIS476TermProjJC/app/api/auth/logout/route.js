import sessionManager from '@/lib/sessionManager'

export async function POST(req) {
  const userId = req.headers.get('x-user-id')
  if (!userId) {
    return new Response(JSON.stringify({ error: 'User ID is missing' }), { status: 400 })
  }

  sessionManager.removeSession(userId)
  return new Response(JSON.stringify({ message: 'Logged out successfully' }), { status: 200 })
}
