import { useState } from "react";
import axios from "axios";

function TaskForm({ getTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("personal");

  const submitHandler = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/tasks",
      {
        title,
        description,
        date,
        time,
        priority,
        category,
        status: "pending",
        reminder: true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setTitle("");
    setDescription("");
    setDate("");
    setTime("");
    setPriority("medium");
    setCategory("personal");

    getTasks();
  };

  return (
    <form onSubmit={submitHandler} className="task-form">
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="personal">Personal</option>
        <option value="school">School</option>
        <option value="work">Work</option>
        <option value="meeting">Meeting</option>
        <option value="other">Other</option>
      </select>

      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;