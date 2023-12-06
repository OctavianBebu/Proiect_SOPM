import logo from "./logo.svg";
import "./App.css";
import CustomModal from "./components/CustomModal";
import { useState, useEffect } from "react";
import Form from "./components/Form";
import Header from "./components/Header";
import TasksList from "./components/TasksList";

function App() {
  const [tasks, setTasks] = useState([]);
  // Filter tasks state
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [filteredTasks, setFilteredTasks] = useState([]);

  // Count all tasks
  const numTasks = tasks.length;

  const filterPriorityTasks = (tasks, priority) =>
    tasks.filter((task) => task.priority === priority);

  // Filter tasks by priority
  const lowTasks = filterPriorityTasks(tasks, "low");
  const mediumTasks = filterPriorityTasks(tasks, "medium");
  const highTasks = filterPriorityTasks(tasks, "high");

  // Count tasks by priority
  const countLowTasks = lowTasks.length;
  const countMediumTasks = mediumTasks.length;
  const countHighTasks = highTasks.length;

  useEffect(() => {
    const updateFilteredTasks = () => {
      switch (selectedPriority) {
        case "low":
          setFilteredTasks(filterPriorityTasks(tasks, "low"));
          break;
        case "medium":
          setFilteredTasks(filterPriorityTasks(tasks, "medium"));
          break;
        case "high":
          setFilteredTasks(filterPriorityTasks(tasks, "high"));
          break;
        default:
          setFilteredTasks(tasks);
      }
    };

    updateFilteredTasks();
  }, [tasks, selectedPriority]);

  // CRUD operations
  function handleSetTasks(task) {
    setTasks((tasks) => [...tasks, task]);
  }

  function handleUpdateTasks(id, status) {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, status } : task))
    );
  }

  function handleDeleteTasks(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmed) {
      setTasks((tasks) => tasks.filter((task) => task.id !== id));
    }
  }

  return (
    <div className="App">
      <Header numTasks={numTasks} />
      <div className="main_form_container">
        <div className="header_form_container">
          <h2 className="subtitle">Your tasks:</h2>
          <span
            className={`priority_label ${
              selectedPriority === "all" ? "active" : ""
            }`}
            onClick={() => setSelectedPriority("all")}
          >
            All: {numTasks}
          </span>
          <span
            className={`priority_label ${
              selectedPriority === "low" ? "active" : ""
            }`}
            onClick={() => setSelectedPriority("low")}
          >
            Low Priority: {countLowTasks}
          </span>
          <span
            className={`priority_label ${
              selectedPriority === "medium" ? "active" : ""
            }`}
            onClick={() => setSelectedPriority("medium")}
          >
            Medium Priority: {countMediumTasks}
          </span>
          <span
            className={`priority_label ${
              selectedPriority === "high" ? "active" : ""
            }`}
            onClick={() => setSelectedPriority("high")}
          >
            High Priority: {countHighTasks}
          </span>

          <CustomModal title={"Add a task"}>
            <Form onSetTasks={handleSetTasks} />
          </CustomModal>
        </div>
        <div className="body_form_container">
          {filteredTasks.length === 0 ? (
            "No tasks"
          ) : (
            <TasksList
              tasks={filteredTasks}
              onDeleteTasks={handleDeleteTasks}
              onUpdateTasks={handleUpdateTasks}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;