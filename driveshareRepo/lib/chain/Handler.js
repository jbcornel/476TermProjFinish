// lib/chain/Handler.js

export default class Handler {
    setNext(handler) {
      this.nextHandler = handler;
      return handler;
    }
  
    async handle(requestData) {
      // If there's a next handler in the chain, pass it along
      if (this.nextHandler) {
        return this.nextHandler.handle(requestData);
      }
      // If we reach here, all steps have succeeded
      return { success: true };
    }
  }
  