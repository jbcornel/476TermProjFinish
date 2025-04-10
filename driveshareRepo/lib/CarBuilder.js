// lib/CarBuilder.js

class CarBuilder {
    constructor() {
      this.car = {}
    }
  
    setModel(model) {
      this.car.model = model
      return this
    }
  
    setYear(year) {
      this.car.year = Number(year)
      return this
    }
  
    setMileage(mileage) {
      this.car.mileage = Number(mileage)
      return this
    }
  
    setPrice(price) {
      this.car.pricePerHour = parseFloat(price)
      return this
    }
  
    setLocation(location) {
      this.car.location = location
      return this
    }
  
    setOwnerId(ownerId) {
      this.car.ownerId = Number(ownerId)
      return this
    }
  
    setAvailabilityRange(availableFrom, availableTo) {
      this.car.availableFrom = new Date(availableFrom);
      this.car.availableTo = new Date(availableTo);
      this.car.available = true;
      return this;
    }
  
    build() {
      if (!this.car.model || !this.car.year || !this.car.ownerId) {
        throw new Error('Missing required fields in CarBuilder')
      }
      return this.car
    }
  }
  
  export default CarBuilder
  