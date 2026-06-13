function TaskList({ tasks, updateTask, deleteTask }) {
  return (
    <>
      {tasks.map((task) => (
        <div
          className={`task-card ${task.priority} ${
            task.status === "completed" ? "completed" : ""
          }`}
          key={task._id}
        >
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Time: {task.time}</p>
          <p>Priority: {task.priority}</p>
          <p>Status: {task.status}</p>

          <button onClick={() => updateTask(task._id)}>Complete</button>
          <button onClick={() => deleteTask(task._id)}>Delete</button>
        </div>
      ))}
    </>
  );
}

export default TaskList;