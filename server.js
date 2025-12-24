import express from "express";
import http from "http";
import crypto from "crypto";
import { Server } from "socket.io";
import Show from "./models/Show.js";
import Hold from "./models/Hold.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const show = new Show();

// userId → Hold
const activeHolds = {};

io.on("connection", (socket) => {
  socket.emit("show:update", show);

  // HOLD SEAT
  socket.on("holdSeat", ({ seatId, user }) => {
    const seat = show.seats.find(s => s.seatId === seatId);
    if (!seat || seat.status !== "AVAILABLE") return;

    // Create hold if not exists
    if (!activeHolds[user.userId]) {
      activeHolds[user.userId] =
        new Hold(crypto.randomUUID(), user.userId);
    }

    const hold = activeHolds[user.userId];

    seat.status = "HELD";
    hold.seatIds.push(seatId);

    io.emit("hold:update", {
      userId: user.userId,
      seatIds: hold.seatIds
    });

    io.emit("show:update", show);
  });

  // CONFIRM BOOKING
  socket.on("confirmBooking", ({ userId }) => {
    const hold = activeHolds[userId];
    if (!hold) return;

    hold.seatIds.forEach(id => {
      const seat = show.seats.find(s => s.seatId === id);
      seat.status = "BOOKED";
      seat.bookedBy = userId;
    });

    delete activeHolds[userId];
    io.emit("show:update", show);
  });

  // CANCEL HOLD
  socket.on("cancelHold", ({ userId }) => {
    const hold = activeHolds[userId];
    if (!hold) return;

    hold.seatIds.forEach(id => {
      const seat = show.seats.find(s => s.seatId === id);
      seat.status = "AVAILABLE";
    });

    delete activeHolds[userId];
    io.emit("show:update", show);
  });
});

server.listen(3000, () =>
  console.log("Backend running at http://localhost:3000")
);