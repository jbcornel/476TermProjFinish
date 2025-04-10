"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function RecoveryPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [newPassword, setNewPassword] = useState(""); 
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const emailInputRef = useRef();

  //Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  //Fetch the userId based on the entered email
  async function handleFetchUserId() {
    try {
      if (!email) {
        alert("Email is required.");
        return;
      }

      console.log("Attempting to fetch userId for email:", email);

      const res = await fetch(`/api/auth/recover/userId`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),  //Send the email as JSON body
      });

      if (!res.ok) {
        console.error("Failed to fetch userId:", await res.text());
        alert("Error fetching userId.");
        return;
      }

      const data = await res.json();
      console.log("Fetched userId:", data.userId);

      if (data.userId) {
        setUserId(data.userId);  //Set userId in state
        alert("User ID fetched successfully");
        handleFetchQuestions(data.userId);  //Fetch security questions after getting userId
      }
    } catch (error) {
      console.error("Error during user ID fetch:", error);
      alert("An error occurred while fetching the user ID.");
    }
  }

  //Fetch the security questions for the user
  async function handleFetchQuestions(userId) {
    setLoading(true);

    try {
      const res = await fetch(`/api/auth/recover/securityQuestions?userId=${userId}`);

      if (!res.ok) {
        throw new Error("Error fetching security questions.");
      }

      const data = await res.json();

      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
      } else {
        throw new Error("No security questions found for this user.");
      }
    } catch (err) {
      setErrorMessage(err.message || "An error occurred.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  //Handle input change for answers
  const handleAnswerChange = (index, value) => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[index] = value;
      return newAnswers;
    });
  };

  //Handle password input change
  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  //Handle form submission to verify answers and reset password
  const handleSubmitAnswers = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(`/api/auth/recover`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          answers,
          newPassword, //Add the new password to the request body
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "An error occurred while submitting the answers.");
      }

      alert("Password updated successfully!");
      router.push("/login"); //Redirect to the login page after password reset
    } catch (err) {
      setErrorMessage(err.message || "An error occurred while submitting the answers.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
      <h1>Password Recovery</h1>

      <section>
        <h2>Enter Your Email Address</h2>
        <input
          ref={emailInputRef}
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          required
          style={{ width: "100%", padding: "8px", marginBottom: "1rem" }}
        />
        <button onClick={handleFetchUserId} disabled={loading}>
          {loading ? "Loading..." : "Submit Email"}
        </button>
      </section>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {userId && (
        <section>
          <h2>Security Questions</h2>
          <form onSubmit={handleSubmitAnswers}>
            {questions.length > 0 ? (
              questions.map((question, index) => (
                <div key={index} style={{ marginBottom: "1rem" }}>
                  <label>{`Question ${index + 1}: ${question.prompt}`}</label>
                  <input
                    type="text"
                    value={answers[index] || ""}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    required
                    placeholder="Answer"
                    style={{ width: "100%", padding: "8px" }}
                  />
                </div>
              ))
            ) : (
              <p>No security questions found.</p>
            )}

            <div style={{ marginBottom: "1rem" }}>
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={handlePasswordChange}
                required
                placeholder="Enter your new password"
                style={{ width: "100%", padding: "8px" }}
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Verify Answers and Reset Password"}
            </button>
          </form>
        </section>
      )}
    </div>
  );
}
