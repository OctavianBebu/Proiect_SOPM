import { useState } from "react";
import Task from "./Task";

// Set order for sorting
const statusOrder = ["Completed", "Overdue", "Upcoming", "Cancelled"];

function TasksList({ tasks, onDeleteTasks, onUpdateTasks }) {
  const [sortBy, setSortBy] = useState("input");
  const [filterBy, setFilterBy] = useState("input");

  let filteredTasks;

  switch (filterBy) {
    case "all":
      filteredTasks = tasks;
      break;

    case "Completed":
      filteredTasks = tasks.filter((task) => task.status === "Completed");
      break;

    case "Overdue":
      filteredTasks = tasks.filter((task) => task.status === "Overdue");
      break;

    case "Upcoming":
      filteredTasks = tasks.filter((task) => task.status === "Upcoming");
      break;

    case "Cancelled":
      filteredTasks = tasks.filter((task) => task.status === "Cancelled");
      break;

    default:
      // Dacă filterBy nu corespunde niciunei opțiuni cunoscute, afișează toate task-urile
      filteredTasks = tasks;
      break;
  }

  // Count tasks for each filter label
  const nrCompleted = tasks.filter(
    (task) => task.status === "Completed"
  ).length;
  const nrOverdue = tasks.filter((task) => task.status === "Overdue").length;
  const nrUpcoming = tasks.filter((task) => task.status === "Upcoming").length;
  const nrCancelled = tasks.filter(
    (task) => task.status === "Cancelled"
  ).length;

  // Apoi, sortează în funcție de sortBy

  let sortedTasks;

  switch (sortBy) {
    case "input":
      sortedTasks = filteredTasks;
      break;

    case "title":
      sortedTasks = filteredTasks
        .slice()
        .sort((a, b) => a.title.localeCompare(b.title));
      break;

    case "note":
      sortedTasks = filteredTasks
        .slice()
        .sort((a, b) => a.note.localeCompare(b.note));
      break;

    case "status":
      sortedTasks = filteredTasks.slice().sort((a, b) => {
        const statusA = statusOrder.indexOf(a.status);
        const statusB = statusOrder.indexOf(b.status);
        return statusA - statusB;
      });
      break;

    default:
      // Dacă sortBy nu corespunde niciunei opțiuni cunoscute, să se păstreze array-ul neschimbat
      sortedTasks = filteredTasks;
      break;
  }
  return (
    <>
      <select
        className="filter_and_sort"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="input">Sort by input order</option>
        <option value="title">Sort by title</option>
        <option value="note">Sort by notes</option>
        <option value="status">Sort by status</option>
      </select>
      <select
        className="filter_and_sort"
        value={filterBy}
        onChange={(e) => setFilterBy(e.target.value)}
      >
        <option value="all">Show all ({tasks.length})</option>
        <option value="Completed">Show completed tasks ({nrCompleted})</option>
        <option value="Overdue">Show overdue tasks ({nrOverdue})</option>
        <option value="Upcoming">Show upcoming tasks ({nrUpcoming})</option>
        <option value="Cancelled">Show cancelled tasks ({nrCancelled})</option>
      </select>
      <ul className="tasks_container">
        {sortedTasks.map((task) => (
          <Task
            task={task}
            key={task.id}
            onDeleteTasks={onDeleteTasks}
            onUpdateTasks={onUpdateTasks}
          />
        ))}
      </ul>
    </>
  );
}

export default TasksList;
