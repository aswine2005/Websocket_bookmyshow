import { useState } from "react";

export default function UsernameGate({ onSubmit }) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) return;

    onSubmit({
      userId: crypto.randomUUID(),
      name: name.trim(),
    });
  };

  return (
    <div className="username-gate">
      <h2>Enter your name</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
      />
      <button onClick={handleSubmit}>Continue</button>
    </div>
  );
}