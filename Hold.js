export default class Hold {
  constructor(holdId, userId) {
    this.holdId = holdId;
    this.userId = userId;
    this.seatIds = [];
    this.createdAt = Date.now();
  }
}