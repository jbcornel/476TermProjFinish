// components/MediatorContext.js
"use client"; // or for pages router, ignore this line

import React, { createContext, useContext, useRef } from 'react';

/**
 * The Mediator class orchestrates cross-component communication.
 * For example, when a booking is created, it can notify other parts of the UI,
 * or when a user logs in, it can share that info with multiple components.
 */
class AppMediator {
  constructor() {
    // Store some shared state or references if needed
    this.user = null;
    this.subscribers = {};
  }

  // Example: a pub/sub method inside the Mediator
  subscribe(eventType, callback) {
    if (!this.subscribers[eventType]) {
      this.subscribers[eventType] = [];
    }
    this.subscribers[eventType].push(callback);
  }
  unsubscribe(eventType, callback) {
    if (!this.subscribers[eventType]) return;
    this.subscribers[eventType] = this.subscribers[eventType].filter(
      (cb) => cb !== callback
    );
  }
  publish(eventType, data) {
    if (this.subscribers[eventType]) {
      this.subscribers[eventType].forEach(cb => cb(data));
    }
  }

  // Example: set current user
  setUser(user) {
    this.user = user;
    this.publish('userChanged', user);
  }

  getUser() {
    return this.user;
  }

  // Additional mediator logic:
  // e.g. "bookingCreated(booking)" => this.publish('bookingCreated', booking);
  // e.g. "messageSent(msg)" => this.publish('messageSent', msg);
}

const MediatorContext = createContext(null);

export function MediatorProvider({ children }) {
  // We keep one instance of the mediator for the entire app
  const mediatorRef = useRef(new AppMediator());

  return (
    <MediatorContext.Provider value={mediatorRef.current}>
      {children}
    </MediatorContext.Provider>
  );
}

// Custom hook for easy usage in components
export function useMediator() {
  return useContext(MediatorContext);
}
