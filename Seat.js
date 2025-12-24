export default class Seat {
  constructor(id) {
    this.seatId = id;
    this.status = "AVAILABLE";
    this.bookedBy = null;
  }
}