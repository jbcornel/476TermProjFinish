"use client";

import { useState, useEffect} from "react";
import { useRouter } from "next/navigation";

export default function AddCarPage() {
  const router = useRouter();

 
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");
  const [location, setLocation] = useState("");
  const [pricePerHour, setPricePerHour] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableTo, setAvailableTo] = useState("");
  const [userId, setUserId] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);


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

  //Validate the inputs and return an array of errors (if any)
  const validateInputs = () => {
    const errors = [];

    if (!brand.trim()) errors.push("Brand is required.");
    if (!model.trim()) errors.push("Model is required.");

    const parsedYear = parseInt(year, 10);
    if (!year || isNaN(parsedYear) || parsedYear < 1900 || parsedYear > new Date().getFullYear() + 1) {
      errors.push("Please enter a valid year.");
    }

    const parsedMileage = parseInt(mileage, 10);
    if (!mileage || isNaN(parsedMileage) || parsedMileage < 0) {
      errors.push("Please enter a valid mileage.");
    }

    if (!location.trim()) errors.push("Location is required.");

    const parsedPrice = parseFloat(pricePerHour);
    if (!pricePerHour || isNaN(parsedPrice) || parsedPrice < 0) {
      errors.push("Please enter a valid price per hour.");
    }

    if (!availableFrom) errors.push("Available From date is required.");
    if (!availableTo) errors.push("Available To date is required.");

    const fromDate = new Date(availableFrom);
    const toDate = new Date(availableTo);
    if (availableFrom && availableTo) {
      if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
        errors.push("Please enter valid dates for availability.");
      } else if (fromDate >= toDate) {
        errors.push("Available From must be before Available To.");
      }
    }

    return errors;
  };

  //Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const errors = validateInputs();
    if (errors.length > 0) {
      setErrorMessage(errors.join(" "));
      return;
    }
    var parsedModel = brand.trim() + " " +  model.trim()
    setLoading(true);
    try {
      const res = await fetch("/api/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
          
        },
        body: JSON.stringify({
          
          model: parsedModel,
          year: parseInt(year, 10),
          mileage: parseInt(mileage, 10),
          location: location.trim(),
          pricePerHour: parseFloat(pricePerHour),
          ownerId: parseInt(userId),
          availableFrom,
          availableTo,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to add car.");
      }

      alert("Car added successfully!");
      router.push("/cars");
    } catch (error) {
      console.error("Error adding car:", error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "1rem" }}>
      <h1>Add a Car</h1>
      {errorMessage && (
        <p style={{ color: "red", marginBottom: "1rem" }}>{errorMessage}</p>
      )}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          type="text"
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          required
          style={{ padding: "8px" }}
        />
        <input
          type="text"
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
          style={{ padding: "8px" }}
        />
        <input
          type="number"
          placeholder="Year (e.g., 2021)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
          style={{ padding: "8px" }}
        />
        <input
          type="number"
          placeholder="Mileage (e.g., 50000)"
          value={mileage}
          onChange={(e) => setMileage(e.target.value)}
          required
          style={{ padding: "8px" }}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          style={{ padding: "8px" }}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Price per Hour (e.g., 25.50)"
          value={pricePerHour}
          onChange={(e) => setPricePerHour(e.target.value)}
          required
          style={{ padding: "8px" }}
        />
        <div>
          <label>Available From:</label>
          <input
            type="datetime-local"
            value={availableFrom}
            onChange={(e) => setAvailableFrom(e.target.value)}
            required
            style={{ padding: "8px", width: "100%" }}
          />
        </div>
        <div>
          <label>Available To:</label>
          <input
            type="datetime-local"
            value={availableTo}
            onChange={(e) => setAvailableTo(e.target.value)}
            required
            style={{ padding: "8px", width: "100%" }}
          />
        </div>
        <button type="submit" disabled={loading} style={{ padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", cursor: "pointer" }}>
          {loading ? "Adding Car..." : "Add Car"}
        </button>
      </form>
    </div>
  );
}
