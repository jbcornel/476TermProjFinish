// lib/sessionManager.js

class SessionManager {
  constructor() {
    this.sessions = new Map();
    this.timeouts = new Map();
  }

  createSession(userId, data) {
    console.log('🧠 [SessionManager] Creating session:', userId, data);
    this.sessions.set(Number(userId), data);
    this.setSessionTimeout(userId);
  }

  setSessionTimeout(userId) {
    const id = Number(userId);
    if (this.timeouts.has(id)) clearTimeout(this.timeouts.get(id));
    const timeout = setTimeout(() => this.removeSession(id), 30 * 60 * 1000);
    this.timeouts.set(id, timeout);
  }

  hasSession(userId) {
    return this.sessions.has(Number(userId));
  }

  getSession(userId) {
    const id = Number(userId);
    if (this.sessions.has(id)) {
      this.setSessionTimeout(id);
      return this.sessions.get(id);
    }
    return null;
  }

  removeSession(userId) {
    const id = Number(userId);
    this.sessions.delete(id);
    if (this.timeouts.has(id)) {
      clearTimeout(this.timeouts.get(id));
      this.timeouts.delete(id);
    }
  }
}

// 👇 THIS is the real fix — use global to persist across requests
const globalForSession = globalThis;

if (!globalForSession.sessionManager) {
  globalForSession.sessionManager = new SessionManager();
}

const sessionManager = globalForSession.sessionManager;
export default sessionManager;
