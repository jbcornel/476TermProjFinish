// app/messages/chat/[with]/page.js
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useMediator } from "@/components/MediatorContext";
import { useRouter } from "next/navigation";
import SendMessage from "@/components/SendMessage";

export default function ChatPage() {
  // Retrieve the conversation partner's ID from the URL.
  const { with: partnerIdParam } = useParams();
  const partnerId = parseInt(partnerIdParam, 10);
  const [messages, setMessages] = useState([]);
  const mediator = useMediator();
  const router = useRouter();
  const [userId, setUserId] = useState(null);

  // Function to fetch the conversation (all messages) from your API.
  async function fetchConversation() {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User not logged in");
      return;
    }
    try {
      const res = await fetch(`/api/messages?with=${partnerId}`, {
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
      });
      if (res.status === 401) {
        router.push("/login");
       // return null; // Stop further execution.
      }
      if (!res.ok) throw new Error("Failed to fetch conversation");
      const data = await res.json();
      // Assume your server returns messages sorted by timestamp (ascending).
      setMessages(data || []);
    } catch (err) {
      console.error("Error fetching conversation:", err);
    }
  }

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

    if (!partnerId) return;

    // 1. Fetch the full conversation when the page mounts or partner changes.
    fetchConversation();

    // 2. Define the mediator callback for immediate updates.
    const handleNewMessage = (newMsg) => {
      // Only add the new message if it belongs to this conversation.
      if (newMsg.senderId === partnerId || newMsg.receiverId === partnerId) {
        setMessages((prev) => {
          // Deduplicate: only add if not already in the list.
          if (prev.some((m) => m.id === newMsg.id)) {
            return prev;
          }
          return [...prev, newMsg];
        });
      }
    };

    // Subscribe to mediator events.
    mediator.subscribe("newMessage", handleNewMessage);

    // 3. Poll the server every 10 seconds to catch any missed messages.
    const interval = setInterval(() => {
      fetchConversation();
    }, 2000);

    // Cleanup on unmount: clear the interval and unsubscribe the event.
    return () => {
      clearInterval(interval);
      mediator.unsubscribe("newMessage", handleNewMessage);
    };
  }, [partnerId, mediator]);

  if (!partnerId) {
    return <p>No conversation selected. Please specify a partner in the URL.</p>;
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
              <strong>{msg.senderId === partnerId ? "Them" : "You"}:</strong> {msg.content}
            </div>
          ))
        )}
      </div>
      {/* SendMessage component handles sending a new message and publishes "newMessage" */}
      <SendMessage receiverId={partnerId} />
    </div>
  );
}
