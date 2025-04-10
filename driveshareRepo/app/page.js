//starting page
"use client";

import Link from 'next/link';
import { useMediator } from '@/components/MediatorContext';

export default function HomePage() {
  const mediator = useMediator();
  return (
    <div>
      <h1>Welcome to DriveShare</h1>
      {mediator.getUser() ? (
        <p>Welcome to Driveshare.</p>
      ) : (
        <div>
          <Link href="/login">Login</Link> | <Link href="/register">Register</Link>
        </div>
      )}
      <nav>
        <ul>
          <li><Link href="/cars">Cars</Link></li>
          <li><Link href="/bookings">Bookings</Link></li>
          <li><Link href="/messages/inbox">Messages</Link></li>
        </ul>
      </nav>
    </div>
  );
}
