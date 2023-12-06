import { useState } from "react";

const priorityLevels = {
  low: { value: "Low", color: "green" },
  medium: { value: "Medium", color: "yellow" },
  high: { value: "High", color: "red" },
};
const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

let currentDate = `${year}-${month < 10 ? "0" : ""}${month}-${
  day < 10 ? "0" : ""
}${day}`;

function Form({ onSetTasks, onSubmit }) {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [dueDate, setDueDate] = useState(currentDate);
  const [priority, setPriority] = useState("low");
  const [hasNote, setHasNote] = useState(false);

  function handleAddNote(btn) {
    btn.preventDefault();
    setHasNote(!hasNote);
  }
  function handleSubmit(e) {
    e.preventDefault();

    if (!title) return;
    const newTask = {
      id: Date.now(),
      title,
      note,
      dueDate,
      hasNote,
      priority,
      status: "Upcoming",
      createdAt: new Date(),
    };
    onSetTasks(newTask);

    // Reset state
    setTitle("");
    setNote("");
    setPriority("low");
    setHasNote(false);
    onSubmit();
    setDueDate("");
  }

  return (
    <form className="add_task_form" onSubmit={handleSubmit}>
      <div className="container_inputs">
        <div className="input_container">
          <label>Task name:</label>
          <input
            className="add_task_input"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input_container">
          <label>Priority:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            {Object.keys(priorityLevels).map((priorityKey) => (
              <option
                onChange={(e) => setPriority(e.target.value)}
                key={priorityKey}
                value={priorityKey}
              >
                {priorityLevels[priorityKey].value}
              </option>
            ))}
          </select>
        </div>

        <div className="input_container">
          <label>Due Date:</label>
          <input
            type="date"
            className="add_task_input"
            placeholder="Task Title"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        {hasNote && (
          <div className="input_container">
            <label>Add a note:</label>
            <textarea
              value={note}
              placeholder="Add a note"
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        )}
      </div>
      <div className="btns_container">
        {" "}
        <button onClick={handleAddNote}>
          {hasNote ? "Close" : "Add note"}
        </button>
        <button className="btn_modal_add_task" type="submit">
          Add task
        </button>
      </div>
    </form>
  );
}

export default Form;
