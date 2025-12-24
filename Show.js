import Seat from "./Seat.js";

export default class Show {
  constructor() {
    this.seats = Array.from({ length: 30 }, (_, i) =>
      new Seat(`A${i + 1}`)
    );
  }
}