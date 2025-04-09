// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { useMediator } from "@/components/MediatorContext";
// import Link from "next/link";

// export default function BookingDetailsPage() {
//   const { id } = useParams(); // booking id from URL
//   const bookingId = Number(id);
//   const router = useRouter();
//   const mediator = useMediator();

//   // States for user, booking, car details, loading and error.
//   const [userId, setUserId] = useState(null);
//   const [booking, setBooking] = useState(null);
//   const [car, setCar] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Form state for editing booking dates
//   const [editStartDate, setEditStartDate] = useState("");
//   const [editEndDate, setEditEndDate] = useState("");
//   const [bookingStart, setBookingStart] = useState("");
//   const [bookingEnd, setBookingEnd] = useState("");
//   // Additional state for payment messages (for renters)
//   const [paymentMessage, setPaymentMessage] = useState("");

//   // Load userId from localStorage on client side
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const id = localStorage.getItem("userId");
//       setUserId(id);
//     }
//   }, []);

//   // Fetch booking details using the bookingId.
//   async function fetchBookingDetails() {
//     if (!userId) return;
//     try {
//       const res = await fetch(`/api/bookings/${bookingId}`, {
//         headers: {
//           "Content-Type": "application/json",
//           "x-user-id": userId,
//         },
//       });
//       if (res.status === 404) {
//         router.push("/bookings");
//         return;
//       }
//       if (!res.ok) throw new Error("Failed to fetch booking details");
//       const data = await res.json();
//       setBooking(data);
//       setEditStartDate(new Date(data.startDate).toISOString().slice(0, 16));
//       setEditEndDate(new Date(data.endDate).toISOString().slice(0, 16));
//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setError(err.message);
//       setLoading(false);
//     }
//   }

//   // Fetch car details using the carId from the booking.
//   async function fetchCarDetails(carId) {
//     if (!userId) return;
//     try {
//       const res = await fetch(`/api/cars/${carId}`, {
//         headers: {
//           "Content-Type": "application/json",
//           "x-user-id": userId,
//         },
//       });
//       if (!res.ok) throw new Error("Failed to fetch car details");
//       const data = await res.json();
//       setCar(data);
//     } catch (err) {
//       console.error(err);
//       setError(err.message);
//     }
//   }

//   // Poll for booking details every 10 seconds.
//   useEffect(() => {
//     if (!userId) return;
//     async function fetchData() {
//       await fetchBookingDetails();
//     }
//     fetchData();
//     const interval = setInterval(() => {
//       fetchBookingDetails();
//     }, 2000);
//     return () => clearInterval(interval);
//   }, [userId, bookingId]);

//   // Once booking is loaded, fetch the associated car details.
//   useEffect(() => {
//     if (booking && booking.carId) {
//       fetchCarDetails(booking.carId);
//     }
//   }, [booking]);

//   // Mediator subscription: update booking details in real time.
//   useEffect(() => {
//     if (!userId) return;
//     const handleBookingEvent = (event) => {
//       if (event.booking.id !== bookingId) return;
//       if (["updated", "approved", "disapproved"].includes(event.type)) {
//         setBooking(event.booking);
//         setEditStartDate(new Date(event.booking.startDate).toISOString().slice(0, 16));
//         setEditEndDate(new Date(event.booking.endDate).toISOString().slice(0, 16));
//       } else if (event.type === "cancelled") {
//         router.push("/bookings");
//       }
//     };
//     mediator.subscribe("bookingEvent", handleBookingEvent);
//     return () => {
//       mediator.unsubscribe("bookingEvent", handleBookingEvent);
//     };
//   }, [userId, bookingId, mediator, router]);

//   // Determine if current user is the owner of the car.
//   const isOwner = booking && booking.car && Number(userId) === booking.car.ownerId;

//   // Handler for updating booking dates (available for both roles)
//   async function handleUpdate(e) {
//     e.preventDefault();
//     try {
//       const res = await fetch(`/api/bookings/${bookingId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           "x-user-id": userId,
//         },
//         body: JSON.stringify({ startDate: editStartDate, endDate: editEndDate }),
//       });
//       if (!res.ok) throw new Error("Failed to update booking");
//       const updatedData = await res.json();
//       setBooking(updatedData);
//       mediator.publish("bookingEvent", { type: "updated", booking: updatedData });
//       alert("Booking updated successfully");
//     } catch (err) {
//       console.error(err);
//       alert(err.message);
//     }
//   }


//   async function handleAddBooking(e) {
//     e.preventDefault();
//     try {
//       const res = await fetch("/api/bookings", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "x-user-id": userId,
//         },
//         body: JSON.stringify({ 
//           carId, 
//           startDate: bookingStart, 
//           endDate: bookingEnd 
//         }),
//       });
//       if (!res.ok) throw new Error("Failed to create booking");
//       const newBooking = await res.json();
//       mediator.publish("bookingEvent", { type: "created", booking: newBooking });
//       // Optionally, refresh bookings list after a short delay to ensure server data is updated.
//       setTimeout(fetchCarBookings, 500);
//       alert("Booking created successfully!");
//       setBookingStart("");
//       setBookingEnd("");
//     } catch (err) {
//       console.error(err);
//       alert(err.message);
//     }
//   }
  
//   // Handler for canceling booking (available for both roles)
//   async function handleCancelBooking() {
//     if (!confirm("Are you sure you want to cancel this booking?")) return;
//     try {
//       const res = await fetch(`/api/bookings/${bookingId}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           "x-user-id": userId
//         }
//       });
//       if (!res.ok) {
//         throw new Error("Failed to cancel booking");
//       }
//       const data = await res.json();
//       alert(data.message);
//       router.push("/bookings");
//     } catch (err) {
//       console.error(err);
//       alert(err.message);
//     }
//   }

//   // Owner approval/disapproval handlers.
//   async function handleApproval(action) {
//     try {
//       const res = await fetch(`/api/bookings/${bookingId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           "x-user-id": userId,
//         },
//         body: JSON.stringify({ action }), // "approve" or "disapprove"
//       });
//       if (!res.ok) {
//         throw new Error(`Failed to ${action} booking`);
//       }
//       const updatedBooking = await res.json();
//       setBooking(updatedBooking);
//       mediator.publish("bookingEvent", { type: action === "approve" ? "approved" : "disapproved", booking: updatedBooking });
//       alert(`Booking ${action}d successfully`);
//     } catch (err) {
//       console.error(err);
//       alert(err.message);
//     }
//   }

//   // Renter payment handler.
//   async function handlePayment() {
//     try {
//       // Payment amount can be the booking cost.
//       const res = await fetch("http://localhost:4000/charge", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           bookingId,
//           amount: booking.cost
//         }),
//       });
//       if (!res.ok) throw new Error("Payment request failed");
//       const paymentResult = await res.json();
//       setPaymentMessage(paymentResult.message);
//       alert(paymentResult.message);
//       // Optionally, update booking status to 'paid' by calling your booking update endpoint.
//     } catch (err) {
//       console.error(err);
//       setPaymentMessage("Payment failed: " + err.message);
//       alert("Payment failed: " + err.message);
//     }
//   }

//   // Payment message state is already defined above.
  
//   if (loading) return <p>Loading booking details...</p>;
//   if (error) return <p>Error: {error}</p>;
//   if (!booking) return <p>No booking found.</p>;

//   return (
//     <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
//       <h1>Booking Details (#{bookingId})</h1>

//       {/* Booking Information */}
//       <section style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
//         <h2>Booking Information</h2>
//         <p><strong>Booking ID:</strong> {booking.id}</p>
//         <p><strong>Car ID:</strong> {booking.carId}</p>
//         <p><strong>Renter ID:</strong> {booking.renterId}</p>
//         <p><strong>Cost:</strong> {booking.cost}</p>
//         <p><strong>Payment Status:</strong> {booking.paymentStatus}</p>
//         <p>
//           <strong>Start Date:</strong> {new Date(booking.startDate).toLocaleString()}
//         </p>
//         <p>
//           <strong>End Date:</strong> {new Date(booking.endDate).toLocaleString()}
//         </p>
//         <p><strong>Status:</strong> {booking.status}</p>
//       </section>

//       {/* Car Information */}
//       {car && (
//         <section style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
//           <h2>Car Information</h2>
//           <p><strong>Model:</strong> {car.model}</p>
//           <p><strong>Year:</strong> {car.year}</p>
//           <p><strong>Mileage:</strong> {car.mileage}</p>
//           <p><strong>Location:</strong> {car.location}</p>
//           <p><strong>Price per Hour:</strong> ${car.pricePerHour}</p>
//           <p>
//             <strong>Availability:</strong> {new Date(car.availableFrom).toLocaleString()} to {new Date(car.availableTo).toLocaleString()}
//           </p>
//           <Link href={`/cars/${car.id}`}>
//             <button style={{ marginTop: "0.5rem" }}>View Car Listing</button>
//           </Link>
//         </section>
//       )}

//       {/* Edit Booking Section */}
//       <section style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
//         <h2>Edit Booking Details</h2>
//         <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
//           <div>
//             <label>New Start Date: </label>
//             <input
//               type="datetime-local"
//               value={editStartDate}
//               onChange={(e) => setEditStartDate(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label>New End Date: </label>
//             <input
//               type="datetime-local"
//               value={editEndDate}
//               onChange={(e) => setEditEndDate(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit">Update Booking</button>
//         </form>
//       </section>

//       {/* Owner Actions */}
//       {isOwner && (
//         <section style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
//           <h2>Owner Actions</h2>
//           {booking.status === "pending" && (
//             <>
//               <button onClick={() => handleApproval("approve")} style={{ marginRight: "1rem", backgroundColor: "green", color: "white" }}>
//                 Approve Booking
//               </button>
//               <button onClick={() => handleApproval("disapprove")} style={{ backgroundColor: "orange", color: "white" }}>
//                 Disapprove Booking
//               </button>
//             </>
//           )}
//           {booking.status !== "pending" && (
//             <p>Booking has been {booking.status}.</p>
//           )}
//         </section>
//       )}

//       {/* Renter Actions */}
//       {!isOwner && (
//         <section style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
//           <h2>Renter Actions</h2>
//           <button onClick={handlePayment} style={{ marginBottom: "1rem" }}>
//             Pay Now
//           </button>
//           {paymentMessage && <p>{paymentMessage}</p>}
//           <section>
//             <h2>Book this Car</h2>
//             <form onSubmit={handleAddBooking} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
//               <div>
//                 <label>Start Date: </label>
//                 <input
//                   type="datetime-local"
//                   value={bookingStart}
//                   onChange={(e) => setBookingStart(e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <label>End Date: </label>
//                 <input
//                   type="datetime-local"
//                   value={bookingEnd}
//                   onChange={(e) => setBookingEnd(e.target.value)}
//                   required
//                 />
//               </div>
//               <button type="submit">Book this Car</button>
//             </form>
//           </section>
//         </section>
//       )}

//       {/* Cancel Booking (available to both) */}
//       <button onClick={handleCancelBooking} style={{ marginTop: "1rem", color: "red", fontWeight: "bold" }}>
//         Cancel Booking
//       </button>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMediator } from "@/components/MediatorContext";
import Link from "next/link";
import BookingController from "@/lib/BookingController";

export default function BookingDetailsPage() {
  const { id } = useParams(); // booking id from URL
  const bookingId = Number(id);
  const router = useRouter();
  const mediator = useMediator();

  // States for user, booking, car details, loading and error.
  const [userId, setUserId] = useState(null);
  const [booking, setBooking] = useState(null);
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state for editing booking dates.
  const [editStartDate, setEditStartDate] = useState("");
  const [editEndDate, setEditEndDate] = useState("");
  const [bookingStart, setBookingStart] = useState("");
  const [bookingEnd, setBookingEnd] = useState("");
  // Payment message state (for renters)
  const [paymentMessage, setPaymentMessage] = useState("");

  // Load userId from localStorage on client side.
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

  // Fetch booking details using the bookingId.
  async function fetchBookingDetails() {
    if (!userId) return;
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
      });
      if (res.status === 404) {
        router.push("/bookings");
        return;
      }
      if (!res.ok) throw new Error("Failed to fetch booking details");
      const data = await res.json();
      setBooking(data);
      setEditStartDate(new Date(data.startDate).toISOString().slice(0, 16));
      setEditEndDate(new Date(data.endDate).toISOString().slice(0, 16));
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setLoading(false);
    }
  }

  // Fetch car details using the carId from the booking.
  async function fetchCarDetails(carId) {
    if (!userId) return;
    try {
      const res = await fetch(`/api/cars/${carId}`, {
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch car details");
      const data = await res.json();
      setCar(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  }



  async function handleAddBooking(e) {
    e.preventDefault();
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
        body: JSON.stringify({ 
          carId, 
          startDate: bookingStart, 
          endDate: bookingEnd 
        }),
      });
      if (!res.ok) throw new Error("Failed to create booking");
      const newBooking = await res.json();
      mediator.publish("bookingEvent", { type: "created", booking: newBooking });
      // Optionally, refresh bookings list after a short delay to ensure server data is updated.
      setTimeout(fetchCarBookings, 500);
      alert("Booking created successfully!");
      setBookingStart("");
      setBookingEnd("");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }
  // Poll for booking details every 10 seconds.
  useEffect(() => {
    if (!userId) return;
    async function fetchData() {
      await fetchBookingDetails();
    }
    fetchData();
    const interval = setInterval(() => {
      fetchBookingDetails();
    }, 20000);
    return () => clearInterval(interval);
  }, [userId, bookingId]);

  // When booking details are loaded, fetch the associated car details.
  useEffect(() => {
    if (booking && booking.carId) {
      fetchCarDetails(booking.carId);
    }
  }, [booking]);

  // Mediator subscription: update booking details in real time.
  useEffect(() => {
    if (!userId) return;
    const handleBookingEvent = (event) => {
      // Expected event payload: { type: "updated" | "approved" | "disapproved" | "paid" | "cancelled", booking }
      if (event.booking.id !== bookingId) return;
      if (["updated", "approved", "disapproved", "paid"].includes(event.type)) {
        setBooking(event.booking);
        setEditStartDate(new Date(event.booking.startDate).toISOString().slice(0, 16));
        setEditEndDate(new Date(event.booking.endDate).toISOString().slice(0, 16));
      } else if (event.type === "cancelled") {
        router.push("/bookings");
      }
    };
    mediator.subscribe("bookingEvent", handleBookingEvent);
    return () => {
      mediator.unsubscribe("bookingEvent", handleBookingEvent);
    };
  }, [userId, bookingId, mediator, router]);

  // Determine if the current user is the owner of the car.

  // Handler for updating booking dates (for both roles)
  async function handleUpdate(e) {
    e.preventDefault();
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
        body: JSON.stringify({ startDate: editStartDate, endDate: editEndDate }),
      });
      if (!res.ok) throw new Error("Failed to update booking");
      const updatedData = await res.json();
      setBooking(updatedData);
      mediator.publish("bookingEvent", { type: "updated", booking: updatedData });
      alert("Booking updated successfully");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  // Handler for canceling booking (available for both roles)
  async function handleCancelBooking() {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    try {
      // if (booking.paymentStatus == 'paid'){
      //   handleRefund(booking)
      // }
      const updateRes = await fetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId
        },
        body: JSON.stringify({ action: "cancelled" })
      });
      if (!updateRes.ok) {
        const errorData = await updateRes.json();
        throw new Error(errorData.error || "Failed to update booking payment status");
      }
      const updatedBooking = await updateRes.json();
      setBooking(updatedBooking);
      mediator.publish("bookingEvent", { type: "cancelled", booking: updatedBooking });
      alert("Cancellation successful!");
    } catch (err) {
      console.error(err);
      alert("Cancellation failed: " + err.message);
    }
  }


  // Handler for owner approval/disapproval actions.
  async function handleApproval(action) {
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
        body: JSON.stringify({ action }), // "approve" or "disapprove"
      });
      if (!res.ok) {
        throw new Error(`Failed to ${action} booking`);
      }
      const updatedBooking = await res.json();
      setBooking(updatedBooking);
      mediator.publish("bookingEvent", { type: action === "approve" ? "approved" : "disapproved", booking: updatedBooking });
      alert(`Booking ${action}d successfully`);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  // Handler for processing payment from renters.
  async function handlePayment() {
    try {
      // First, send a payment request to the payment server.
      const paymentRes = await fetch("http://localhost:4000/charge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          bookingId,
          amount: booking.cost
        }),
      });
      if (!paymentRes.ok) {
        const errorData = await paymentRes.json();
        throw new Error(errorData.error || "Payment request failed");
      }
      const paymentResult = await paymentRes.json();
      alert(paymentResult.message);

      // Now update the booking's payment status to "paid".
      const updateRes = await fetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId
        },
        body: JSON.stringify({ action: "paid" })
      });
      if (!updateRes.ok) {
        const errorData = await updateRes.json();
        throw new Error(errorData.error || "Failed to update booking payment status");
      }
      const updatedBooking = await updateRes.json();
      setBooking(updatedBooking);
      mediator.publish("bookingEvent", { type: "paid", booking: updatedBooking });
      alert("Payment successful!");
      setPaymentMessage("Payment successful!");
    } catch (err) {
      console.error(err);
      setPaymentMessage("Payment failed: " + err.message);
      alert("Payment failed: " + err.message);
    }
  }

  // New: Handler for deleting the booking (only allowed if booking is paid & approved and time has passed)
  async function handleDeleteBooking() {
    // Ensure booking has ended and is both paid and approved
    const bookingHasEnded = new Date(booking.endDate) < new Date();
    if(booking.status !='cancelled'){
    if (!bookingHasEnded || booking.status !== "approved" || booking.paymentStatus !== "paid") {
      alert("Booking cannot be deleted until it is paid, approved, and has ended.");
      return;
    }
  }
    if (!confirm("This booking is completed. Are you sure you want to permanently delete it?")) return;
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId
        }
      });
      if (!res.ok) throw new Error("Failed to delete booking");
      const data = await res.json();
      alert(data.message);
      router.push("/bookings");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  if (loading) return <p>Loading booking details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!booking) return <p>No booking found.</p>;

  // Determine if the current user is the owner of the car.
  const isOwner = booking.car && Number(userId) === booking.car.ownerId;
  // Determine if booking can be deleted: it must be paid, approved, and ended.
  const bookingHasEnded = new Date(booking.endDate) < new Date();
  const canDelete = bookingHasEnded && booking.status === "approved" && booking.paymentStatus === "paid";

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
      <h1>Booking Details (#{bookingId})</h1>

      {/* Booking Information Section */}
      <section style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
        <h2>Booking Information</h2>
        <p><strong>Booking ID:</strong> {booking.id}</p>
        <p><strong>Car ID:</strong> {booking.carId}</p>
        <p><strong>Renter ID:</strong> {booking.renterId}</p>
        <p><strong>Cost:</strong> {booking.cost}</p>
        <p>
          <strong>Start Date:</strong> {new Date(booking.startDate).toLocaleString()}
        </p>
        <p>
          <strong>End Date:</strong> {new Date(booking.endDate).toLocaleString()}
        </p>
        <p><strong>Status:</strong> {booking.status}</p>
        <p><strong>Payment Status:</strong> {booking.paymentStatus || "unpaid"}</p>
      </section>

      {/* Car Information Section */}
      {car && (
        <section style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
          <h2>Car Information</h2>
          <p><strong>Model:</strong> {car.model}</p>
          <p><strong>Year:</strong> {car.year}</p>
          <p><strong>Mileage:</strong> {car.mileage}</p>
          <p><strong>Location:</strong> {car.location}</p>
          <p><strong>Price per Hour:</strong> ${car.pricePerHour}</p>
          <p>
            <strong>Availability:</strong> {new Date(car.availableFrom).toLocaleString()} to {new Date(car.availableTo).toLocaleString()}
          </p>
          <Link href={`/cars/${car.id}`}>
            <button style={{ marginTop: "0.5rem" }}>View Car Listing</button>
          </Link>
        </section>
      )}

      {/* Edit Booking Section */}
      <section style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
        <h2>Edit Booking Details</h2>
        <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <div>
            <label>New Start Date: </label>
            <input
              type="datetime-local"
              value={editStartDate}
              onChange={(e) => setEditStartDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label>New End Date: </label>
            <input
              type="datetime-local"
              value={editEndDate}
              onChange={(e) => setEditEndDate(e.target.value)}
              required
            />
          </div>
          <button type="submit">Update Booking</button>
        </form>
      </section>

      {/* Owner Actions Section */}
      {isOwner && (
        <section style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
          <h2>Owner Actions</h2>
          {booking.status === "pending" && (
            <>
              <button onClick={() => handleApproval("approve")} style={{ marginRight: "1rem", backgroundColor: "green", color: "white" }}>
                Approve Booking
              </button>
              <button onClick={() => handleApproval("disapprove")} style={{ backgroundColor: "orange", color: "white" }}>
                Disapprove Booking
              </button>
            </>
          )}
          {booking.status !== "pending" && (
            <p>Booking has been {booking.status}.</p>
          )}
        </section>
      )}

      {/* Renter Actions Section */}
      {!isOwner && (
        <section style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
          <h2>Renter Actions</h2>
          {booking.paymentStatus !== "paid" && (
            <button onClick={handlePayment} style={{ marginBottom: "1rem" }}>
              Pay Now
            </button>
          )}
          {paymentMessage && <p>{paymentMessage}</p>}
          <section>
            <h2>Book this Car</h2>
            <form onSubmit={handleAddBooking} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div>
                <label>Start Date: </label>
                <input
                  type="datetime-local"
                  value={bookingStart}
                  onChange={(e) => setBookingStart(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>End Date: </label>
                <input
                  type="datetime-local"
                  value={bookingEnd}
                  onChange={(e) => setBookingEnd(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Book this Car</button>
            </form>
          </section>
        </section>
      )}

      {/* Delete Booking Section */}
      {booking.status === "cancelled"  || canDelete ? (
        <button
          onClick={handleDeleteBooking}
          style={{ marginTop: "1rem", backgroundColor: "red", color: "white", fontWeight: "bold" }}
        >
          Delete Booking
        </button>
      ) : (
        <button
          onClick={handleCancelBooking}
          style={{ marginTop: "1rem", color: "red", fontWeight: "bold" }}
        >
          Cancel Booking
        </button>
      )}
    </div>
  );
}
