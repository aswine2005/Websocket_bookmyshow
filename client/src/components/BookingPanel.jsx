import { socket } from "../api/socket";

export default function BookingPanel({ user, heldSeats }) {
  if (heldSeats.length === 0) return null;

  return (
    <div className="booking-panel">
      <h3>Your Hold</h3>
      <p>Seats: {heldSeats.join(", ")}</p>

      <button
        className="confirm"
        onClick={() =>
          socket.emit("confirmBooking", { userId: user.userId })
        }
      >
        Confirm (Mock Payment)
      </button>

      <button
        className="cancel"
        onClick={() =>
          socket.emit("cancelHold", { userId: user.userId })
        }
      >
        Cancel Hold
      </button>
    </div>
  );
}