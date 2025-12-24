export default function Seat({ seat, onClick }) {
  const disabled = seat.status === "BOOKED";

  return (
    <button
      className={`seat ${seat.status}`}
      disabled={disabled}
      onClick={() => onClick(seat.seatId)}
    >
      {seat.seatId}
    </button>
  );
}