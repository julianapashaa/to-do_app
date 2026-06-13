import { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "../components/TaskForm";
import Navbar from "../components/Navbar";
import Calendar from "../components/Calendar";

function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  const getTasks = async () => {
    const token = localStorage.getItem("token");

    const { data } = await axios.get("http://localhost:5000/api/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTasks(data);
  };

  const deleteTask = async (id) => {
    const token = localStorage.getItem("token");

    await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    getTasks();
  };

  const updateTask = async (id) => {
    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/tasks/${id}`,
      { status: "completed" },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    getTasks();
  };

  useEffect(() => {
    const loadTasks = async () => {
      await getTasks();
    };

    loadTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.status === "completed";
    }

    if (filter === "today") {
      const today = new Date().toLocaleDateString();
      return new Date(task.date).toLocaleDateString() === today;
    }

    if (filter === "upcoming") {
      return new Date(task.date) > new Date();
    }

    return true;
  });

  const groupedTasks = filteredTasks.reduce((groups, task) => {
    const date = new Date(task.date).toLocaleDateString();

    if (!groups[date]) {
      groups[date] = [];
    }

    groups[date].push(task);
    return groups;
  }, {});

  return (
    <div className="layout">
      <Navbar setFilter={setFilter} />

      <div className="main-content">
        <h1>My Planner</h1>

        <TaskForm getTasks={getTasks} />

        <Calendar
          groupedTasks={groupedTasks}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
}

export default DashboardPage;