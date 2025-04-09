// app/messages/inbox/page.js
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMediator } from "@/components/MediatorContext";

export default function InboxContactsPage() {
  const [activeConversations, setActiveConversations] = useState([]);
  const [ownersList, setOwnersList] = useState([]); // For renters: owners of your bookings
  const [bookeesList, setBookeesList] = useState([]); // For owners: bookees of your cars
  const router = useRouter();
  const mediator = useMediator();
  const [userId, setUserId] = useState(null);

  // Load userId from localStorage in a client-side effect
  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("userId");
      const storedUserId = localStorage.getItem("userId");
    if (!id) {
      // If not found, redirect to /login
      router.push("/login");
    } else {
      // Otherwise, store it in state
      setUserId(storedUserId);
    }
    
    }
  }, []);

  // --- Active Conversations ---
  async function fetchActiveConversations() {
    if (!userId) return;
    try {
      const res = await fetch("/api/messages/inbox", {
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch active conversations");
      const data = await res.json();
      setActiveConversations(data.conversations || []);
    } catch (err) {
      console.error("Error fetching active conversations:", err);
    }
  }

  // --- Owners for Your Bookings (for renters) ---
  async function fetchOwnersForBookings() {
    if (!userId) return;
    try {
      // Fetch bookings where current user is the renter.
      const res = await fetch("/api/bookings", {
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch bookings");
      const data = await res.json();
      // Assume your API returns an object: { bookings: [...] } or an array directly.
      const bookings = data.bookings || data || [];
      // For each booking, fetch car details using the carId.
      const carFetches = bookings.map(async (booking) => {
        if (!booking.carId) return null;
        const carRes = await fetch(`/api/cars/${booking.carId}`, {
          headers: {
            "Content-Type": "application/json",
            "x-user-id": userId,
          },
        });
        if (res.status === 401) {
          router.push("/login");
          return null; // Stop further execution.
        }
       
        if (!carRes.ok) {
          console.error(`Failed to fetch car with id ${booking.carId}`);
          return null;
        }
        const carData = await carRes.json();
        return carData; // Expect carData to include ownerId (and optionally ownerName)
      });
      const cars = await Promise.all(carFetches);
      const validCars = cars.filter((c) => c !== null);
      // Build a unique map of owners based on car.ownerId.
      const ownersMap = {};
      validCars.forEach((car) => {
        if (car.ownerId) {
          ownersMap[car.ownerId] = {
            id: car.ownerId,
            name: car.ownerName || "User " + car.ownerId,
          };
        }
      });
      setOwnersList(Object.values(ownersMap));
    } catch (err) {
      console.error("Error fetching owners for bookings:", err);
    }
  }

  // --- Bookees of Your Cars (for owners) ---
  async function fetchBookeesOfCars() {
    if (!userId) return;
    try {
      const res = await fetch("/api/bookings/owner", {
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
      });
      if (res.status === 401) {
        router.push("/login");
        return; // Stop further execution.
      }
      if (!res.ok) throw new Error("Failed to fetch owner bookings");
      const data = await res.json();
      const bookings = data.bookings || data || [];
      const bookeesMap = {};
      bookings.forEach((booking) => {
        if (booking.renterId) {
          bookeesMap[booking.renterId] = {
            id: booking.renterId,
            name: booking.renterName || "User " + booking.renterId,
          };
        }
      });
      setBookeesList(Object.values(bookeesMap));
    } catch (err) {
      console.error("Error fetching bookees of your cars:", err);
    }
  }

  // --- Polling: Fetch all lists every 10 seconds ---
  useEffect(() => {
    if (!userId) return;
    fetchActiveConversations();
    fetchOwnersForBookings();
    fetchBookeesOfCars();

    const interval = setInterval(() => {
      fetchActiveConversations();
      fetchOwnersForBookings();
      fetchBookeesOfCars();
    }, 2000);

    return () => clearInterval(interval);
  }, [userId]);

  // --- Mediator Subscription for Active Conversations ---
  useEffect(() => {
    if (!userId) return;
    const handleNewMessage = (msg) => {
      const currentUserId = Number(userId);
      // Determine conversation partner: if current user is sender, then partner is receiver, else partner is sender.
      const partnerId =
        msg.senderId === currentUserId ? msg.receiverId : msg.senderId;
      setActiveConversations((prev) => {
        const index = prev.findIndex((conv) => conv.partnerId === partnerId);
        if (index !== -1) {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            lastMessage: msg.content,
            timestamp: msg.timestamp,
          };
          return updated;
        } else {
          return [
            ...prev,
            {
              partnerId,
              partnerName: "User " + partnerId,
              lastMessage: msg.content,
              timestamp: msg.timestamp,
            },
          ];
        }
      });
    };

    mediator.subscribe("newMessage", handleNewMessage);
    return () => {
      mediator.unsubscribe("newMessage", handleNewMessage);
    };
  }, [userId, mediator]);

  // --- Navigation Handler ---
  const startChat = (contactId) => {
    router.push(`/messages/chat/${contactId}`);
  };

  if (!userId) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Inbox & Contacts</h1>

      {/* Active Conversations Section */}
      <section>
        <h2>Active Conversations</h2>
        {activeConversations.length === 0 ? (
          <p>No active conversations.</p>
        ) : (
          <ul>
            {activeConversations.map((conv) => (
              <li key={conv.partnerId} style={{ marginBottom: "1rem" }}>
                <Link href={`/messages/chat/${conv.partnerId}`}>
                  <div style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                    <strong>
                      {conv.partnerName || "User " + conv.partnerId}
                    </strong>
                    <p>{conv.lastMessage}</p>
                    <small>
                      {conv.timestamp
                        ? new Date(conv.timestamp).toLocaleString()
                        : ""}
                    </small>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Owners for Your Bookings (for renters) */}
      <section>
        <h2>Owners for Your Bookings</h2>
        {ownersList.length === 0 ? (
          <p>No owners found.</p>
        ) : (
          <ul>
            {ownersList.map((owner) => (
              <li key={owner.id} style={{ marginBottom: "0.5rem" }}>
                {owner.name}
                <button
                  onClick={() => startChat(owner.id)}
                  style={{ marginLeft: "1rem" }}
                  title="Start Chat"
                >
                  +
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Bookees of Your Cars (for owners) */}
      <section>
        <h2>Bookees of Your Cars</h2>
        {bookeesList.length === 0 ? (
          <p>No bookees found.</p>
        ) : (
          <ul>
            {bookeesList.map((bookee) => (
              <li key={bookee.id} style={{ marginBottom: "0.5rem" }}>
                {bookee.name}
                <button
                  onClick={() => startChat(bookee.id)}
                  style={{ marginLeft: "1rem" }}
                  title="Start Chat"
                >
                  +
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
