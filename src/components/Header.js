function Header({ numTasks }) {
  return (
    <header>
      <div className="header_content">
        <h1>TaskTrax</h1>
        <span className="total_tasks">Your tasks: {numTasks}</span>
      </div>
    </header>
  );
}

export default Header;
