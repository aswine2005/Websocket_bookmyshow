export default function Header({ user }) {
  return (
    <header className="header">
      <h1>🎬 BookMyShow</h1>
      <div>User: {user.name}</div>
    </header>
  );
}