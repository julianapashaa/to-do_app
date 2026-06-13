function Navbar({ setFilter }) {
  return (
    <div className="topbar">
      <h2>My Planner</h2>

      <div className="nav-links">
        <button onClick={() => setFilter("all")}>
          Dashboard
        </button>

        <button onClick={() => setFilter("today")}>
          Today
        </button>

        <button onClick={() => setFilter("upcoming")}>
          Upcoming
        </button>

        <button onClick={() => setFilter("completed")}>
          Completed
        </button>
      </div>
    </div>
  );
}

export default Navbar;