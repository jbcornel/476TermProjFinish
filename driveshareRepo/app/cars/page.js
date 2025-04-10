"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMediator } from "@/components/MediatorContext";


export default function CarsPage() {
  const router = useRouter();
  const [ownedCars, setOwnedCars] = useState([]);
  const [bookedCars, setBookedCars] = useState([]);
  const [availableCars, setAvailableCars] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState("");
  const [userId, setUserId] = useState(null);
  const mediator = useMediator();

  //Search fields
  const [searchBrand, setSearchBrand] = useState("");
  const [searchModel, setSearchModel] = useState("");
  const [searchYear, setSearchYear] = useState("");
  const [searchMaxMileage, setSearchMaxMileage] = useState("");
  const [searchMaxPrice, setSearchMaxPrice] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchStartDate, setSearchStartDate] = useState("");
  const [searchEndDate, setSearchEndDate] = useState("");

  //Load userId from localStorage on client side
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

  //Fetch Owned Cars (My Owned Cars)
  async function fetchOwnedCars() {
    if (!userId) return;
    try {
      const res = await fetch("/api/cars?mine=true", {
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch owned cars");
      const data = await res.json();
      const allCars = data.cars || data;
      const owned = allCars.filter((car) => car.ownerId === Number(userId));
      setOwnedCars(owned);
    } catch (err) {
      console.error(err);
    }
  }

  //Fetch Booked Cars (where the user is the renter)
  async function fetchBookedCars() {
    if (!userId) return;
    try {
      const res = await fetch("/api/bookings", {
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch bookings");
      const data = await res.json();
      const bookings = data.bookings || [];
      const userBookings = bookings.filter(
        (booking) => booking.renterId === Number(userId)
      );
      setBookedCars(userBookings);
    } catch (err) {
      console.error(err);
    }
  }

  //Fetch Available Cars (initial load)
  async function fetchAvailableCars() {
    if (!userId) return;
    try {
      const res = await fetch(`/api/cars?available=true&limit=10`, {
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch available cars");
      const data = await res.json();
      const allAvailable = data.cars || data;
      const filtered = allAvailable.filter((car) => car.ownerId !== Number(userId));
      setAvailableCars(filtered);
    } catch (err) {
      console.error(err);
    }
  }

  //Poll endpoints every 2 seconds.
  useEffect(() => {
    if (!userId) return;
    fetchOwnedCars();
    fetchBookedCars();
    fetchAvailableCars();
    const interval = setInterval(() => {
      fetchOwnedCars();
      fetchBookedCars();
      fetchAvailableCars();
    }, 2000);
    return () => clearInterval(interval);
  }, [userId]);

 
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    e.preventDefault();
    if (!searchStartDate || !searchEndDate) {
      setSearchError("Please enter an availability window (start and end date) before searching.");
      return;
    }
    //Clear the error if dates are provided.
    setSearchError("");
    if (!userId) return;

    //Build query parameters
    const params = new URLSearchParams();
    if (searchStartDate) params.append("startDate", searchStartDate);
    if (searchEndDate) params.append("endDate", searchEndDate);
    if (searchBrand) params.append("brand", searchBrand);
    if (searchModel) params.append("model", searchModel);
    if (searchYear) params.append("year", searchYear);
    if (searchMaxMileage) params.append("maxMileage", searchMaxMileage);
    if (searchMaxPrice) params.append("maxPrice", searchMaxPrice);
    if (searchLocation) params.append("location", searchLocation);

    const queryString = params.toString();
    console.log("Search Query String:", queryString);

    try {
      const res = await fetch(`/api/cars/search?${queryString}`, {
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
      });
      if (!res.ok) throw new Error("Failed to search available cars");
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto" }}>
      <h1>Cars</h1>

      {/* Section 1: My Owned Cars */}
      <section style={{ marginBottom: "2rem" }}>
        <h2>My Owned Cars</h2>
        <Link href="/cars/add">
          <button style={{ marginBottom: "1rem" }}>Add a Car</button>
        </Link>
        {ownedCars.length === 0 ? (
          <p>You do not own any cars (or all your owned cars have been booked).</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {ownedCars.map((car) => (
              <li key={car.id} style={{ marginBottom: "1rem", border: "1px solid #ccc", padding: "1rem" }}>
                <div>
                  <strong>{car.model}</strong> - {car.year} - {car.location} - ${car.pricePerHour}/hr
                </div>
                <Link href={`/cars/${car.id}`}>
                  <button style={{ marginTop: "0.5rem" }}>View Details</button>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Section 2: My Booked Cars (as Renter) */}
      <section style={{ marginBottom: "2rem" }}>
        <h2>My Booked Cars</h2>
        {bookedCars.length === 0 ? (
          <p>You have not booked any cars.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {bookedCars.map((booking) => (
              <li key={booking.id} style={{ marginBottom: "1rem", border: "1px solid #ccc", padding: "1rem" }}>
                <div>
                  <strong>Booking #{booking.id}</strong>
                  <p>Car ID: {booking.carId}</p>
                  <p>
                    From: {new Date(booking.startDate).toLocaleString()}<br />
                    To: {new Date(booking.endDate).toLocaleString()}
                  </p>
                  <p>Status: {booking.status}</p>
                </div>
                <Link href={`/cars/${booking.carId}`}>
                  <button style={{ marginTop: "0.5rem" }}>View Car</button>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Section 3: Available Cars for Rent */}
      <section style={{ marginBottom: "2rem" }}>
        <h2>Available Cars for Rent</h2>
        {availableCars.length === 0 ? (
          <p>No available cars found.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {availableCars.map((car) => (
              <li key={car.id} style={{ marginBottom: "1rem", border: "1px solid #ccc", padding: "1rem" }}>
                <div>
                  <strong>{car.model}</strong> - {car.year} - {car.location} - ${car.pricePerHour}/hr
                </div>
                <Link href={`/cars/${car.id}`}>
                  <button style={{ marginTop: "0.5rem" }}>View Details</button>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
{/* Section 4: Search Available Cars */}
      
      {/* Section 4: Search Available Cars */}
      <section style={{ marginBottom: "2rem" }}>
        <h2>Search Available Cars</h2>
        <form onSubmit={handleSearchSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label>Start Date:</label>
            <input
              type="datetime-local"
              value={searchStartDate}
              onChange={(e) => setSearchStartDate(e.target.value)}
              style={{ width: "100%", padding: "8px" }}
              required
            />
          </div>
          <div>
            <label>End Date:</label>
            <input
              type="datetime-local"
              value={searchEndDate}
              onChange={(e) => setSearchEndDate(e.target.value)}
              style={{ width: "100%", padding: "8px" }}
              required
            />
          </div>
          <div>
            <label>Brand:</label>
            <input
              type="text"
              value={searchBrand}
              onChange={(e) => setSearchBrand(e.target.value)}
              placeholder="Enter brand"
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div>
            <label>Model:</label>
            <input
              type="text"
              value={searchModel}
              onChange={(e) => setSearchModel(e.target.value)}
              placeholder="Enter model"
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div>
            <label>Year:</label>
            <input
              type="number"
              value={searchYear}
              onChange={(e) => setSearchYear(e.target.value)}
              placeholder="Enter year"
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div>
            <label>Max Mileage:</label>
            <input
              type="number"
              value={searchMaxMileage}
              onChange={(e) => setSearchMaxMileage(e.target.value)}
              placeholder="Enter maximum mileage"
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div>
            <label>Max Price Per Hour:</label>
            <input
              type="number"
              step="0.01"
              value={searchMaxPrice}
              onChange={(e) => setSearchMaxPrice(e.target.value)}
              placeholder="Enter maximum price per hour"
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div>
            <label>Location:</label>
            <input
              type="text"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              placeholder="Enter location"
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          {/* Display an error message if availability dates are missing */}
          {searchError && <p style={{ color: "red" }}>{searchError}</p>}
          <button
            type="submit"
            style={{ padding: "8px", backgroundColor: "#4CAF50", color: "white", border: "none", cursor: "pointer" }}
          >
            Search
          </button>
        </form>
      </section>
      
      {/* Section 5: Search Results */}
      {searchResults.length > 0 && (
        <section>
          <h2>Search Results</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {searchResults.map((car) => (
              <li key={car.id} style={{ marginBottom: "1rem", border: "1px solid #ccc", padding: "1rem" }}>
                <div>
                  <strong>{car.model}</strong> - {car.year} - {car.location} - ${car.pricePerHour}/hr
                </div>
                <Link href={`/cars/${car.id}`}>
                  <button style={{ marginTop: "0.5rem" }}>View Details</button>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}