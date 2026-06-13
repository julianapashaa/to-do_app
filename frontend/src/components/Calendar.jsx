import TaskList from "./TaskList";

function Calendar({ groupedTasks, updateTask, deleteTask }) {
  return (
    <>
      {Object.keys(groupedTasks).map((date) => (
        <div key={date}>
          <h2 className="date-title">{date}</h2>

          <TaskList
            tasks={groupedTasks[date]}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        </div>
      ))}
    </>
  );
}

export default Calendar;