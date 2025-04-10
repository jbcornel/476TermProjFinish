
"use client";

import React, { createContext, useContext, useRef } from 'react';


 //the Mediator class orchestrates cross-component communication.
 //when an update is made, it notifies the subscribers

class AppMediator {
  constructor() {
    //shared state
    this.user = null;
    this.subscribers = {};
  }

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


  setUser(user) {
    this.user = user;
    this.publish('userChanged', user);
  }

  getUser() {
    return this.user;
  }

}

const MediatorContext = createContext(null);

export function MediatorProvider({ children }) {
  //one instance of the mediator for the entire app
  const mediatorRef = useRef(new AppMediator());

  return (
    <MediatorContext.Provider value={mediatorRef.current}>
      {children}
    </MediatorContext.Provider>
  );
}

//Custom hook for easy usage in components
export function useMediator() {
  return useContext(MediatorContext);
}
