"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMediator } from '@/components/MediatorContext';
import  Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const mediator = useMediator();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      //Call backend login endpoint
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      //if (!res.ok) throw new Error('Login failed');
      const data = await res.json();
      console.log(data)
      //The response from login route returns: { token, userId, email }
      //Store the userId in localStorage for persistent authentication state
      localStorage.setItem('userId', data.userId);

      //Set the user in the mediator so that other components know we're logged in
      //constructing a user object with id, email, and token.
      mediator.setUser({ id: data.userId, email: data.email, token: data.token });

      //Navigate to homepage or user dashboard
      router.push('/');
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };

  return (
    <div>
      <h1 style={{margin:"1rem"}}>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        style={{margin:"1rem"}}/>
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" style={{marginLeft: "1rem"}}>Log In</button>
      </form>
      <section style={{marginTop: "2rem"}}>
              <Link href="/register" legacyBehavior>
                <a style={{ color: "#649dfa", margin: "1rem", marginRight: "1rem" }}>Need to register?</a>
              </Link>
              <Link href="/recovery" legacyBehavior>
                <a style={{ color: "#649dfa", margin: "1rem", marginRight: "1rem"  }}>Forgot password?</a>
              </Link>
      </section>
    </div>

  );
}
