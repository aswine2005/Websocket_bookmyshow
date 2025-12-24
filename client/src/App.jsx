// import { useEffect, useState } from "react";
// import Header from "./components/Header";
// import SeatGrid from "./components/SeatGrid";
// import BookingPanel from "./components/BookingPanel";
// import "./styles.css";

// export default function App() {
//   const [user, setUser] = useState(null);
//   const [heldSeats, setHeldSeats] = useState([]);

//   useEffect(() => {
//     const saved = localStorage.getItem("bms_user");

//     if (saved) {
//       setUser(JSON.parse(saved));
//     } else {
//       const name = prompt("Enter your name");
//       const newUser = {
//         userId: crypto.randomUUID(),
//         name,
//       };
//       localStorage.setItem("bms_user", JSON.stringify(newUser));
//       setUser(newUser);
//     }
//   }, []);

//   if (!user) return null;

//   return (
//     <div className="app">
//       <Header user={user} />

//       <SeatGrid
//         user={user}
//         setHeldSeats={setHeldSeats}
//       />

//       <BookingPanel
//         user={user}
//         heldSeats={heldSeats}
//       />
//     </div>
//   );
// }


//-----------------------------------------------------------
// import { useEffect, useState } from "react";
// import Header from "./components/Header";
// import SeatGrid from "./components/SeatGrid";
// import BookingPanel from "./components/BookingPanel";
// import "./styles.css";

// export default function App() {
//   const [user, setUser] = useState(null);
//   const [heldSeats, setHeldSeats] = useState([]);

//   useEffect(() => {
//     const savedUser = localStorage.getItem("bms_user");

//     if (savedUser) {
//       try {
//         const parsedUser = JSON.parse(savedUser);

//         // ✅ Validate stored user
//         if (parsedUser?.userId && parsedUser?.name) {
//           setUser(parsedUser);
//           return;
//         }
//       } catch (e) {
//         // corrupted JSON → fallback to prompt
//       }
//     }

//     // ✅ Ask username ONLY if missing / invalid
//     const name = prompt("Enter your name");

//     const newUser = {
//       userId: crypto.randomUUID(),
//       name: name || "Guest",
//     };

//     localStorage.setItem("bms_user", JSON.stringify(newUser));
//     setUser(newUser);
//   }, []);

//   if (!user) return null;

//   return (
//     <div className="app">
//       <Header user={user} />

//       <SeatGrid
//         user={user}
//         setHeldSeats={setHeldSeats}
//       />

//       <BookingPanel
//         user={user}
//         heldSeats={heldSeats}
//       />
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import Header from "./components/Header";
import SeatGrid from "./components/SeatGrid";
import BookingPanel from "./components/BookingPanel";
import UsernameGate from "./components/UsernameGate";
import "./styles.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [heldSeats, setHeldSeats] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("bms_user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const handleUserCreate = (userData) => {
    localStorage.setItem("bms_user", JSON.stringify(userData));
    setUser(userData);
  };

  if (!user) {
    return <UsernameGate onSubmit={handleUserCreate} />;
  }

  return (
    <div className="app">
      <Header user={user} />
      <SeatGrid user={user} setHeldSeats={setHeldSeats} />
      <BookingPanel user={user} heldSeats={heldSeats} />
    </div>
  );
}