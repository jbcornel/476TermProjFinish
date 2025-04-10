"use client";

import { useState } from "react";
import { useMediator } from "@/components/MediatorContext";

export default function SendMessage({ receiverId }) {
  const [content, setContent] = useState("");
  const mediator = useMediator();

  async function handleSend(e) {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User not logged in");
      return;
    }
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId
        },
        body: JSON.stringify({ receiverId, content })
      });
      if (!res.ok) {
        throw new Error("Failed to send message");
      }
      const newMessage = await res.json();
      // Publish an event for immediate UI update
      mediator.publish("newMessage", newMessage);
      setContent("");
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Error sending message");
    }
  }

  return (
    <form onSubmit={handleSend}>
      <textarea
        placeholder="Type your message here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}
