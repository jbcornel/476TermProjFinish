"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [question3, setQuestion3] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");


  const prompts = [
    "What street did you grow up on?",
    "What is your favorite color?",
    "What is your favorite meal?",
  ];
  
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          username,
          password,
          questions: [
            { prompt: prompts[0], answer: answer1 },
            { prompt: prompts[1], answer: answer2 },
            { prompt: prompts[2], answer: answer3 },
          ],
        }),

      });

      if (!res.ok) {
        const data = await res.json();
        setErrorMessage(data.error || "Registration failed.");
      } else {
        // Registration successful, redirect to login page.
        router.push("/login");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "2rem auto",
        padding: "1rem",
        border: "1px solid #ccc",
      }}
    >
      <h1>Register</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div>
  <label>{prompts[0]}</label>
  <input
    size="54"
    type="text"
    placeholder="Answer"
    value={answer1}
    onChange={(e) => setAnswer1(e.target.value)}
    required
  />
</div>
<div>
  <label>{prompts[1]}</label>
  <input
    size="54"
    type="text"
    placeholder="Answer"
    value={answer2}
    onChange={(e) => setAnswer2(e.target.value)}
    required
  />
</div>
<div>
  <label>{prompts[2]}</label>
  <input
    size="54"
    type="text"
    placeholder="Answer"
    value={answer3}
    onChange={(e) => setAnswer3(e.target.value)}
    required
  />
</div>


       

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
