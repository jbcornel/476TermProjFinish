"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMediator } from "@/components/MediatorContext";

//Helper functions for updating booking lists
function addBookingToList(list, newBooking) {
  if (list.some((b) => b.id === newBooking.id)) return list;
  return [...list, newBooking];
}

function updateBookingInList(list, updatedBooking) {
  return list.map((b) => (b.id === updatedBooking.id ? updatedBooking : b));
}

function removeBookingFromList(list, bookingId) {
  return list.filter((b) => b.id !== bookingId);
}

export default function BookingsPage() {
  const [bookingsAsRenter, setBookingsAsRenter] = useState([]);
  const [bookingsAsOwner, setBookingsAsOwner] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const mediator = useMediator();
  const [userId, setUserId] = useState(null);

  //Load userId from localStorage on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("userId");
      const storedUserId = localStorage.getItem("userId");
    if (!id) {
      //If not found, redirect to /login
      router.push("/login");
    } else {
      //Otherwise, store it in state
      setUserId(storedUserId);
    }
    
    }
  }, []);

  //Fetch bookings where the user is the renter
  async function fetchBookingsAsRenter() {
    if (!userId) return;
    try {
      const res = await fetch("/api/bookings", {
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
      });
      if (res.status === 401) {
        console.log('hello')
        router.push("/login");
        return; //Stop further execution.
      }
      if (!res.ok) {
        throw new Error("Failed to fetch bookings as renter");
      }
      const data = await res.json();
      setBookingsAsRenter(data.bookings || data);
    } catch (err) {
      console.error("Error fetching bookings as renter:", err);
    }
  }

  //Fetch bookings where the user is the owner (for your cars)
  async function fetchBookingsAsOwner() {
    if (!userId) return;
    try {
      const res = await fetch("/api/bookings/owner", {
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch bookings as owner");
      }
      const data = await res.json();
      setBookingsAsOwner(data.bookings || data);
    } catch (err) {
      console.error("Error fetching bookings as owner:", err);
    }
  }

  //Fetch notifications for the user
  async function fetchNotifications() {
    if (!userId) return;
    try {
      const res = await fetch("/api/notifications", {
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
      });
      
      if (!res.ok) {
        throw new Error("Failed to fetch notifications");
      }
      const data = await res.json();
      setNotifications(data);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  }

  //Poll all endpoints every 2 seconds
  useEffect(() => {
    if (!userId) return;
    //Initial fetch
    fetchBookingsAsRenter();
    fetchBookingsAsOwner();
    fetchNotifications();

    const interval = setInterval(() => {
      fetchBookingsAsRenter();
      fetchBookingsAsOwner();
      fetchNotifications();
    }, 2000);

    return () => clearInterval(interval);
  }, [userId]);

  //Mediator subscription: listen for booking events
  useEffect(() => {
    if (!userId) return;
    const currentUser = Number(userId);

    const handleBookingEvent = (event) => {
      //Expect payload: { type: "created" | "updated" | "cancelled" | "approved", booking }
      const { type, booking } = event;
      const isRenter = booking.renterId === currentUser;
      const isOwner = booking.car && booking.car.ownerId === currentUser;

      if (isRenter) {
        if (type === "created") {
          setBookingsAsRenter((prev) => addBookingToList(prev, booking));
        } else if (type === "updated" || type === "approved") {
          setBookingsAsRenter((prev) => updateBookingInList(prev, booking));
        } else if (type === "cancelled") {
          setBookingsAsRenter((prev) => removeBookingFromList(prev, booking.id));
        }
      }
      if (isOwner) {
        if (type === "created") {
          setBookingsAsOwner((prev) => addBookingToList(prev, booking));
        } else if (type === "updated" || type === "approved") {
          setBookingsAsOwner((prev) => updateBookingInList(prev, booking));
        } else if (type === "cancelled") {
          setBookingsAsOwner((prev) => removeBookingFromList(prev, booking.id));
        }
      }
    };

    mediator.subscribe("bookingEvent", handleBookingEvent);
    return () => {
      mediator.unsubscribe("bookingEvent", handleBookingEvent);
    };
  }, [userId, mediator]);

  //Approve booking function for owners
  async function handleApprove(bookingId) {
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
        body: JSON.stringify({ action: "approve" }),
      });
      if (!res.ok) {
        throw new Error("Failed to approve booking");
      }
      const updatedBooking = await res.json();
      //Update the owner bookings list
      setBookingsAsOwner((prev) => updateBookingInList(prev, updatedBooking));
      mediator.publish("bookingEvent", { type: "approved", booking: updatedBooking });
      alert("Booking approved successfully!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  //Navigation handler to view booking details
  const viewBooking = (bookingId) => {
    router.push(`/bookings/${bookingId}`);
  };

  if (!userId) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>My Bookings & Notifications</h1>

      {/* Bookings as Renter */}
      <section>
        <h2>Your Bookings (as Renter)</h2>
        {bookingsAsRenter.length === 0 ? (
          <p>No bookings found where you are the renter.</p>
        ) : (
          <ul>
            {bookingsAsRenter.map((booking) => (
              <li key={booking.id} style={{ marginBottom: "1rem" }}>
                <p>
                  <strong>Booking #{booking.id}</strong> for Car #{booking.carId} from{" "}
                  {new Date(booking.startDate).toLocaleString()} to{" "}
                  {new Date(booking.endDate).toLocaleString()} - Status: {booking.status}
                </p>
                <button onClick={() => viewBooking(booking.id)}>View Details</button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Bookings as Owner */}
      <section>
        <h2>Bookings for Your Cars (as Owner)</h2>
        {bookingsAsOwner.length === 0 ? (
          <p>No bookings found for your cars.</p>
        ) : (
          <ul>
            {bookingsAsOwner.map((booking) => (
              <li key={booking.id} style={{ marginBottom: "1rem" }}>
                <p>
                  <strong>Booking #{booking.id}</strong> for Car #{booking.carId} booked by User #
                  {booking.renterId} from {new Date(booking.startDate).toLocaleString()} to{" "}
                  {new Date(booking.endDate).toLocaleString()} - Status: {booking.status}
                </p>
                <button onClick={() => viewBooking(booking.id)}>View Details</button>
                {/* Show Approve button if booking is pending and user is the owner */}
                {booking.status === "pending" && booking.car && Number(userId) === booking.car.ownerId && (
                  <button
                    onClick={() => handleApprove(booking.id)}
                    style={{ marginLeft: "1rem", backgroundColor: "green", color: "white" }}
                  >
                    Approve Booking
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Notifications */}
      <section>
        <h2>Notifications</h2>
        {notifications.length === 0 ? (
          <p>No notifications.</p>
        ) : (
          <ul>
            {notifications.map((notif) => (
              <li key={notif.id}>
                {notif.content} - {new Date(notif.createdAt).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
