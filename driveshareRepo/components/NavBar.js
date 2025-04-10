"use client"; // Not strictly necessary in the pages router, but safe

import { useEffect, useState } from "react";
import Link from "next/link";
import { useMediator } from "@/components/MediatorContext";

export default function Navbar() {
  const [userId, setUserId] = useState(null);
  const mediator = useMediator();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  // If you want to navigate programmatically, you can do so with next/router
  // or just use <Link> for normal navigation.

  return (
    <header style={{ background: "#333", padding: "1rem" }}>
      <nav style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontSize: "1.5rem" }}>
          <Link href="/" legacyBehavior>
            <a style={{ color: "#fff", textDecoration: "none" }}>DriveShare</a>
          </Link>
        </div>
        <div>
          {userId ? (
            <>
              <Link href="/cars" legacyBehavior>
                <a style={{ color: "#fff", marginRight: "1rem" }}>Cars</a>
              </Link>
              <Link href="/bookings" legacyBehavior>
                <a style={{ color: "#fff", marginRight: "1rem" }}>Bookings</a>
              </Link>
              <Link href="/messages/inbox" legacyBehavior>
                <a style={{ color: "#fff" }}>Messages</a>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" legacyBehavior>
                <a style={{ color: "#fff", marginRight: "1rem" }}>Login</a>
              </Link>
              <Link href="/register" legacyBehavior>
                <a style={{ color: "#fff" }}>Register</a>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
