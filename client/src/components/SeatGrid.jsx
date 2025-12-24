import { useEffect, useState } from "react";
import { socket } from "../api/socket";
import Seat from "./Seat";

export default function SeatGrid({ user, setHeldSeats }) {
  const [show, setShow] = useState(null);

  useEffect(() => {
    socket.on("show:update", setShow);

    socket.on("hold:update", ({ userId, seatIds }) => {
      if (userId === user.userId) {
        setHeldSeats(seatIds);
      }
    });

    return () => {
      socket.off("show:update");
      socket.off("hold:update");
    };
  }, [user.userId]);

  const handleSeatClick = (seatId) => {
    socket.emit("holdSeat", { seatId, user });
  };

  if (!show) {
    return <p className="loading">Loading seats…</p>;
  }

  return (
    <div className="seat-grid">
      {show.seats.map((seat) => (
        <Seat
          key={seat.seatId}
          seat={seat}
          onClick={handleSeatClick}
        />
      ))}
    </div>
  );
}