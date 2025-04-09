// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { useMediator } from "@/components/MediatorContext";

// export default function CarDetailsPage() {
//   const { id } = useParams(); // Car id from URL
//   const carId = Number(id);
//   const router = useRouter();
//   const mediator = useMediator();

//   // States for user, car, bookings, loading and error.
//   const [userId, setUserId] = useState(null);
//   const [car, setCar] = useState(null);
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Booking form states (for non-owners)
//   const [bookingStart, setBookingStart] = useState("");
//   const [bookingEnd, setBookingEnd] = useState("");

//   // Edit listing form states (for owners)
//   const [editModel, setEditModel] = useState("");
//   const [editMileage, setEditMileage] = useState("");
//   const [editLocation, setEditLocation] = useState("");
//   const [editPricePerHour, setEditPricePerHour] = useState("");
//   const [editAvailableFrom, setEditAvailableFrom] = useState("");
//   const [editAvailableTo, setEditAvailableTo] = useState("");

//   // Load userId from localStorage on the client side.
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const id = localStorage.getItem("userId");
//       const storedUserId = localStorage.getItem("userId");
//     if (!id) {
//       // If not found, redirect to /login
//       router.push("/login");
//     } else {
//       // Otherwise, store it in state
//       setUserId(storedUserId);
//     }
    
//     }
//   }, []);

//   // Fetch car details.
//   async function fetchCarDetails() {
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
//       // Prepopulate edit fields if the car data is available.
//       if (data) {
//         setEditModel(data.model || "");
//         setEditMileage(data.mileage || "");
//         setEditLocation(data.location || "");
//         setEditPricePerHour(data.pricePerHour || "");
//         setEditAvailableFrom(new Date(data.availableFrom).toISOString().slice(0, 16));
//         setEditAvailableTo(new Date(data.availableTo).toISOString().slice(0, 16));
//       }
//     } catch (err) {
//       console.error(err);
//       setError(err.message);
//     }
//   }

//   // Fetch bookings for the current car.
//   async function fetchCarBookings() {
//     if (!userId) return;
//     try {
//       const res = await fetch(`/api/bookings?carId=${carId}`, {
//         headers: {
//           "Content-Type": "application/json",
//           "x-user-id": userId,
//         },
//       });
    
//       if (!res.ok) throw new Error("Failed to fetch bookings for this car");
//       const data = await res.json();

//       // Determine if data is wrapped or is a raw array.
//       let bookingsArray = [];
//       if (Array.isArray(data)) {
//         bookingsArray = data;
//       } else if (data.bookings && Array.isArray(data.bookings)) {
//         bookingsArray = data.bookings;
//       }

//       // Filter bookings: try top-level carId, then nested car.id.
//       const filtered = bookingsArray.filter((b) => {
//         let bCarId = null;
//         if (b.carId != null) {
//           bCarId = Number(b.carId);
//         } else if (b.car && b.car.id != null) {
//           bCarId = Number(b.car.id);
//         }
//         return bCarId === carId;
//       });
//       setBookings(filtered);
//     } catch (err) {
//       console.error(err);
//       setError(err.message);
//     }
//   }

//   // Poll for car details and bookings every 10 seconds.
//   useEffect(() => {
//     if (!userId) return;
//     async function fetchData() {
//       await fetchCarDetails();
//       await fetchCarBookings();
//       setLoading(false);
//     }
//     fetchData();
//     const interval = setInterval(() => {
//       fetchCarDetails();
//       fetchCarBookings();
//     }, 2000);
//     return () => clearInterval(interval);
//   }, [userId, carId]);

//   // Mediator subscription: update bookings in real time.
//   useEffect(() => {
//     if (!userId) return;
//     const handleBookingEvent = (event) => {
//       // Expected event payload: { type: "created" | "updated" | "cancelled", booking }
//       // We use a helper to extract the car id from a booking.
//       function getBookingCarId(b) {
//         if (b.carId != null) return Number(b.carId);
//         if (b.car && b.car.id != null) return Number(b.car.id);
//         return null;
//       }
//       if (getBookingCarId(event.booking) !== carId) return;
//       if (event.type === "created") {
//         setBookings((prev) => [...prev, event.booking]);
//       } else if (event.type === "updated") {
//         setBookings((prev) =>
//           prev.map((b) => (b.id === event.booking.id ? event.booking : b))
//         );
//       } else if (event.type === "cancelled") {
//         setBookings((prev) => prev.filter((b) => b.id !== event.booking.id));
//       }
//     };
//     mediator.subscribe("bookingEvent", handleBookingEvent);
//     return () => {
//       mediator.unsubscribe("bookingEvent", handleBookingEvent);
//     };
//   }, [userId, carId, mediator]);

//   // Determine if the current user is the owner of the car.
//   const isOwner = userId && car && Number(userId) === car.ownerId;

//   // Handler for booking form submission (for non-owners).
//   async function handleAddBooking(e) {
//     e.preventDefault();
//     try {
//       const res = await fetch("/api/bookings", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "x-user-id": userId,
//         },
//         body: JSON.stringify({ carId, startDate: bookingStart, endDate: bookingEnd }),
//       });
//       if (!res.ok) throw new Error("Failed to create booking");
//       const newBooking = await res.json();
//       mediator.publish("bookingEvent", { type: "created", booking: newBooking });
//       // Refresh bookings list after a short delay.
//       setTimeout(fetchCarBookings, 500);
//       alert("Booking created successfully!");
//       setBookingStart("");
//       setBookingEnd("");
//     } catch (err) {
//       console.error(err);
//       alert(err.message);
//     }
//   }

//   // Handler for editing the car listing (for owners).
//   async function handleUpdateListing(e) {
//     e.preventDefault();
//     try {
//       const res = await fetch(`/api/cars/${carId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           "x-user-id": userId,
//         },
//         body: JSON.stringify({
//           model: editModel,
//           mileage: Number(editMileage),
//           location: editLocation,
//           pricePerHour: parseFloat(editPricePerHour),
//           availableFrom: new Date(editAvailableFrom),
//           availableTo: new Date(editAvailableTo)
//         }),
//       });
//       if (!res.ok) throw new Error("Failed to update car listing");
//       const updatedCar = await res.json();
//       setCar(updatedCar);
//       alert("Car listing updated successfully!");
//     } catch (err) {
//       console.error(err);
//       alert(err.message);
//     }
//   }

//   async function handleDeleteCarlisting() {
//     if (!confirm("Are you sure you want to permanently delete this car listing? This action cannot be undone.")) {
//       return;
//     }
//     try {
//       const res = await fetch(`/api/cars/${carId}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           "x-user-id": userId
//         }
//       });
//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.error || "Failed to delete car listing");
//       }
//       const data = await res.json();
//       alert(data.message);
//       router.push("/cars"); // Redirect to car listings page after deletion.
//     } catch (err) {
//       console.error(err);
//       alert(err.message);
//     }
//   }
//   if (loading) return <p>Loading car details...</p>;
//   if (error) return <p>Error: {error}</p>;
//   if (!car) return <p>No car found.</p>;

//   return (
//     <div>
//       <h1>Car Details (#{carId})</h1>
//       {/* Car Information Section */}
//       <section style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
//         <h2>Car Information</h2>
//         <p><strong>Model:</strong> {car.model}</p>
//         <p><strong>Year:</strong> {car.year}</p>
//         <p><strong>Mileage:</strong> {car.mileage}</p>
//         <p><strong>Location:</strong> {car.location}</p>
//         <p><strong>Price per Hour:</strong> ${car.pricePerHour}</p>
//         <p>
//           <strong>Availability:</strong> {new Date(car.availableFrom).toLocaleString()} to {new Date(car.availableTo).toLocaleString()}
//         </p>
//       </section>

//       {/* Bookings Section */}
//       <section style={{ marginBottom: "1rem" }}>
//         <h2>Current Bookings for this Car</h2>
//         {bookings.length === 0 ? (
//           <p>No bookings for this car.</p>
//         ) : (
//           <ul>
//             {bookings.map((b) => (
//               <li key={b.id} style={{ marginBottom: "0.5rem" }}>
//                 <p>
//                   Booking #{b.id} from {new Date(b.startDate).toLocaleString()} to {new Date(b.endDate).toLocaleString()} - Status: {b.status}
//                 </p>
//                 <button onClick={() => router.push(`/bookings/${b.id}`)}>
//                   View Details
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </section>

//       {/* Conditional Form Section */}
//       {isOwner ? (
//         // Edit Listing Form (for owners)
//         <section style={{ border: "1px solid #ccc", padding: "1rem" }}>
//           <h2>Edit Car Listing</h2>
//           <form onSubmit={handleUpdateListing} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
//             <div>
//               <label>Model: </label>
//               <input
//                 type="text"
//                 value={editModel}
//                 onChange={(e) => setEditModel(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <label>Mileage: </label>
//               <input
//                 type="number"
//                 value={editMileage}
//                 onChange={(e) => setEditMileage(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <label>Location: </label>
//               <input
//                 type="text"
//                 value={editLocation}
//                 onChange={(e) => setEditLocation(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <label>Price per Hour: </label>
//               <input
//                 type="number"
//                 step="0.01"
//                 value={editPricePerHour}
//                 onChange={(e) => setEditPricePerHour(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <label>Available From: </label>
//               <input
//                 type="datetime-local"
//                 value={editAvailableFrom}
//                 onChange={(e) => setEditAvailableFrom(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <label>Available To: </label>
//               <input
//                 type="datetime-local"
//                 value={editAvailableTo}
//                 onChange={(e) => setEditAvailableTo(e.target.value)}
//                 required
//               />
//             </div>
//             <button type="submit">Update Listing</button>
//           </form>
//           <section style={{ marginBottom: "1rem", marginTop: "2rem"}}>
//           <button onClick={handleDeleteCarlisting} style={{ backgroundColor: "red", color: "white", padding: "0.5rem 1rem" }}>
//             Delete Listing
//           </button>
//         </section>
//         </section>
        
//       ) : (
//         // Booking Form (for non-owners)
//         <section style={{ border: "1px solid #ccc", padding: "1rem" }}>
//           <h2>Book this Car</h2>
//           <form onSubmit={handleAddBooking} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
//             <div>
//               <label>Start Date: </label>
//               <input
//                 type="datetime-local"
//                 value={bookingStart}
//                 onChange={(e) => setBookingStart(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <label>End Date: </label>
//               <input
//                 type="datetime-local"
//                 value={bookingEnd}
//                 onChange={(e) => setBookingEnd(e.target.value)}
//                 required
//               />
//             </div>
//             <button type="submit">Book this Car</button>
//           </form>
//         </section>
//       )}
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMediator } from "@/components/MediatorContext";

export default function CarDetailsPage() {
  const { id } = useParams(); // Car id from URL
  const carId = Number(id);
  const router = useRouter();
  const mediator = useMediator();

  // States for user, car, bookings, loading and error.
  const [userId, setUserId] = useState(null);
  const [car, setCar] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Booking form states (for non-owners)
  const [bookingStart, setBookingStart] = useState("");
  const [bookingEnd, setBookingEnd] = useState("");

  // Edit listing form states (for owners)
  const [editModel, setEditModel] = useState("");
  const [editMileage, setEditMileage] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editPricePerHour, setEditPricePerHour] = useState("");
  const [editAvailableFrom, setEditAvailableFrom] = useState("");
  const [editAvailableTo, setEditAvailableTo] = useState("");
  const [editYear, setEditYear] = useState("");

  // Load userId from localStorage on client side.
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      if (!storedUserId) {
        router.push("/login");
      } else {
        setUserId(storedUserId);
      }
    }
  }, [router]);

  // Fetch car details.
  async function fetchCarDetails() {
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
      // Prepopulate edit fields if the car data is available.
      // if (data) {
      //   setEditModel(data.model || "");
      //   setEditMileage(data.mileage || "");
      //   setEditLocation(data.location || "");
      //   setEditPricePerHour(data.pricePerHour || "");
      //   setEditAvailableFrom(new Date(data.availableFrom).toISOString().slice(0, 16));
      //   setEditAvailableTo(new Date(data.availableTo).toISOString().slice(0, 16));
      // }
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  }

  // Fetch bookings for the current car.
  async function fetchCarBookings() {
    if (!userId) return;
    try {
      const res = await fetch(`/api/bookings?carId=${carId}`, {
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
      });
    
      if (!res.ok) throw new Error("Failed to fetch bookings for this car");
      const data = await res.json();

      // Determine if data is wrapped or is a raw array.
      let bookingsArray = [];
      if (Array.isArray(data)) {
        bookingsArray = data;
      } else if (data.bookings && Array.isArray(data.bookings)) {
        bookingsArray = data.bookings;
      }

      // Filter bookings: try top-level carId, then nested car.id.
      const filtered = bookingsArray.filter((b) => {
        let bCarId = null;
        if (b.carId != null) {
          bCarId = Number(b.carId);
        } else if (b.car && b.car.id != null) {
          bCarId = Number(b.car.id);
        }
        return bCarId === carId;
      });
      setBookings(filtered);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  }

  // Poll for car details and bookings every 10 seconds.
  useEffect(() => {
    if (!userId) return;
    async function fetchData() {
      await fetchCarDetails();
      await fetchCarBookings();
      setLoading(false);
    }
    fetchData();
    const interval = setInterval(() => {
      fetchCarDetails();
      fetchCarBookings();
    }, 2000);
    return () => clearInterval(interval);
  }, [userId, carId]);

  // Mediator subscription: update bookings in real time.
  useEffect(() => {
    if (!userId) return;
    const handleBookingEvent = (event) => {
      // Expected event payload: { type: "created" | "updated" | "cancelled", booking }
      function getBookingCarId(b) {
        if (b.carId != null) return Number(b.carId);
        if (b.car && b.car.id != null) return Number(b.car.id);
        return null;
      }
      if (getBookingCarId(event.booking) !== carId) return;
      if (event.type === "created") {
        setBookings((prev) => [...prev, event.booking]);
      } else if (event.type === "updated") {
        setBookings((prev) =>
          prev.map((b) => (b.id === event.booking.id ? event.booking : b))
        );
      } else if (event.type === "cancelled") {
        setBookings((prev) => prev.filter((b) => b.id !== event.booking.id));
      }
    };
    mediator.subscribe("bookingEvent", handleBookingEvent);
    return () => {
      mediator.unsubscribe("bookingEvent", handleBookingEvent);
    };
  }, [userId, carId, mediator]);

  // Determine if the current user is the owner of the car.
  const isOwner = userId && car && Number(userId) === car.ownerId;

  // Handler for booking form submission (for non-owners).
  async function handleAddBooking(e) {
    e.preventDefault();
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
        body: JSON.stringify({ carId, startDate: bookingStart, endDate: bookingEnd }),
      });
      if (!res.ok) throw new Error("Failed to create booking");
      const newBooking = await res.json();
      mediator.publish("bookingEvent", { type: "created", booking: newBooking });
      // Refresh bookings list after a short delay.
      setTimeout(fetchCarBookings, 500);
      alert("Booking created successfully!");
      setBookingStart("");
      setBookingEnd("");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  // Handler for editing the car listing (for owners).
  // async function handleUpdateListing(e) {
  //   e.preventDefault();
  //   try {
  //     const res = await fetch(`/api/cars/${carId}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "x-user-id": userId,
  //       },
  //       body: JSON.stringify({
  //         model: editModel,
  //         mileage: Number(editMileage),
  //         location: editLocation,
  //         pricePerHour: parseFloat(editPricePerHour),
  //         availableFrom: new Date(editAvailableFrom),
  //         availableTo: new Date(editAvailableTo)
  //       }),
  //     });
  //     if (!res.ok) throw new Error("Failed to update car listing");
  //     const updatedCar = await res.json();
  //     setCar(updatedCar);
  //     alert("Car listing updated successfully!");
  //   } catch (err) {
  //     console.error(err);
  //     alert(err.message);
  //   }
  // }

  async function handleUpdateListing(e) {
    e.preventDefault();
  
    const updatedFields = {};
    if (editModel.trim() !== "") updatedFields.model = editModel.trim();
    if (editMileage.trim() !== "" && !isNaN(Number(editMileage)))
      updatedFields.mileage = Number(editMileage);
    if (editLocation.trim() !== "") updatedFields.location = editLocation.trim();
    if (editPricePerHour.trim() !== "" && !isNaN(parseFloat(editPricePerHour)))
      updatedFields.pricePerHour = parseFloat(editPricePerHour);
    if (editAvailableFrom.trim() !== "")
      updatedFields.availableFrom = new Date(editAvailableFrom);
    if (editAvailableTo.trim() !== "")
      updatedFields.availableTo = new Date(editAvailableTo);
    if (editYear.trim() !== "" && !isNaN(Number(editYear)))
      updatedFields.year = Number(editYear);
    
  
    if (Object.keys(updatedFields).length === 0) {
      alert("Please enter at least one field to update.");
      return;
    }
  
    try {
      const res = await fetch(`/api/cars/${carId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
        body: JSON.stringify(updatedFields),
      });
  
      if (!res.ok) throw new Error("Failed to update car listing");
      const updatedCar = await res.json();
      setCar(updatedCar);
      alert("Car listing updated successfully!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }
  

  async function handleDeleteCarlisting() {
    if (!confirm("Are you sure you want to permanently delete this car listing? This action cannot be undone.")) {
      return;
    }
    try {
      const res = await fetch(`/api/cars/${carId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId
        }
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete car listing");
      }
      const data = await res.json();
      alert(data.message);
      router.push("/cars"); // Redirect to car listings page after deletion.
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  if (loading) return <p>Loading car details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!car) return <p>No car found.</p>;

  return (
    <div>
      <h1>Car Details (#{carId})</h1>
      {/* Car Information Section */}
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
      </section>

      {/* Bookings Section */}
      <section style={{ marginBottom: "1rem" }}>
        <h2>Current Bookings for this Car</h2>
        {bookings.length === 0 ? (
          <p>No bookings for this car.</p>
        ) : (
          <ul>
            {bookings.map((b) => (
              <li key={b.id} style={{ marginBottom: "0.5rem" }}>
                <p>
                  Booking #{b.id} from {new Date(b.startDate).toLocaleString()} to {new Date(b.endDate).toLocaleString()} - Status: {b.status}
                </p>
                { (Number(userId) === b.renterId || (car && Number(userId) === car.ownerId)) ? (
                  <button onClick={() => router.push(`/bookings/${b.id}`)}>
                    View Details
                  </button>
                ) : (
                  <p style={{ fontStyle: "italic", color: "#666" }}>
                    You do not have access to view details.
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Conditional Form Section */}
      {isOwner ? (
        // Edit Listing Form (for owners)
        <section style={{ border: "1px solid #ccc", padding: "1rem" }}>
          <h2>Edit Car Listing</h2>
          <form onSubmit={handleUpdateListing} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div>
              <label>Model: </label>
              <input
                type="text"
                value={editModel}
                onChange={(e) => setEditModel(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Year: </label>
              <input
                type="number"
                value={editYear}
                onChange={(e) => setEditYear(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Mileage: </label>
              <input
                type="number"
                value={editMileage}
                onChange={(e) => setEditMileage(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Location: </label>
              <input
                type="text"
                value={editLocation}
                onChange={(e) => setEditLocation(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Price per Hour: </label>
              <input
                type="number"
                step="0.01"
                value={editPricePerHour}
                onChange={(e) => setEditPricePerHour(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Available From: </label>
              <input
                type="datetime-local"
                value={editAvailableFrom}
                onChange={(e) => setEditAvailableFrom(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Available To: </label>
              <input
                type="datetime-local"
                value={editAvailableTo}
                onChange={(e) => setEditAvailableTo(e.target.value)}
                required
              />
            </div>
            <button type="submit">Update Listing</button>
          </form>
          <section style={{ marginBottom: "1rem", marginTop: "2rem"}}>
            <button onClick={handleDeleteCarlisting} style={{ backgroundColor: "red", color: "white", padding: "0.5rem 1rem" }}>
              Delete Listing
            </button>
          </section>
        </section>
      ) : (
        // Booking Form (for non-owners)
        <section style={{ border: "1px solid #ccc", padding: "1rem" }}>
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
      )}
    </div>
  );
}
