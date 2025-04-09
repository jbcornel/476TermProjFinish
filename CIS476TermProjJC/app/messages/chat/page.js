"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useMediator } from "@/components/MediatorContext";
import SendMessage from "@/components/SendMessage";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const mediator = useMediator();
  const searchParams = useSearchParams();
  const partnerId = searchParams.get("with"); // e.g. ?with=2
  const [userId, setUserId] = useState(null);
  
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
    // 1) Fetch the conversation on mount or when partnerId changes
    if (partnerId) {
      fetchConversation(partnerId);
    }

    // 2) Subscribe to newMessage events from the mediator
    const handleNewMessage = (msg) => {
      // Only add the new message if it's relevant to this conversation
      if (
        (msg.senderId === Number(partnerId) || msg.receiverId === Number(partnerId))
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    mediator.subscribe("newMessage", handleNewMessage);

    return () => {
      // If you had an unsubscribe method in your mediator, call it here
      // mediator.unsubscribe("newMessage", handleNewMessage);
    };
  }, [partnerId, mediator]);

  async function fetchConversation(partnerId) {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User not logged in");
      return;
    }
    try {
      const res = await fetch(`/api/messages?with=${partnerId}`, {
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId
        }
      });
      if (!res.ok) {
        throw new Error("Failed to fetch conversation");
      }
      const data = await res.json();
      setMessages(data || []);
    } catch (err) {
      console.error("Error fetching conversation:", err);
    }
  }

  if (!partnerId) {
    return <p>No conversation selected. Use ?with=someUserId</p>;
  }

  return (
    <div>
      <h1>Chat with User {partnerId}</h1>
      <div style={{ border: "1px solid #ccc", padding: "1rem", minHeight: "200px" }}>
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id}>
              <strong>{msg.senderId === Number(partnerId) ? "Them" : "You"}:</strong>{" "}
              {msg.content}
            </div>
          ))
        )}
      </div>

      {/* 
        SendMessage is a component that calls POST /api/messages,
        then mediator.publish("newMessage", newMessage) on success
      */}
      <SendMessage receiverId={Number(partnerId)} />
    </div>
  );
}
