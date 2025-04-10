

import sessionManager from './sessionManager.js'

export async function authenticate(req) {
  const headerId = req.headers.get('x-user-id');
  const userId = parseInt(headerId);// used as authorization header in req.
  console.log('Authenticating userId:', userId);
  if (!userId || !sessionManager.hasSession(userId)) {
    return {
      status: 401,
      body: { error: 'Unauthorized or session expired' }
    }
  }

  //Extend session and return session data
  const session = sessionManager.getSession(userId)
  return { status: 200, session, userId }
}
