import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../store/kanbanSlice";
import { AppDispatch } from "../store/store";

interface Task {
  id: string;
  text: string;
}

interface BoardProps {
  boardId: string;
  tasks: Task[];
}

const Task = ({ boardId, tasks }: BoardProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [taskText, setTaskText] = useState<string>("");

  const handleAddTask = () => {
    if (taskText.trim() !== "") {
      dispatch(
        addTask({
          boardId,
          task: { id: Date.now().toString(), text: taskText },
        })
      );
      setTaskText("");
    }
  };

  return (
    <>
      <h2 className="font-mono text-lg font-bold mt-1">Tasks:</h2>
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="add task"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          className="p-1 w-[50%] outline-purple-600 border border-gray-500 rounded-lg placeholder:text-center"
        />

        <button
          className="ml-2 bg-slate-300 py-1 rounded-lg hover:bg-green-600 px-3 md:inline-block hidden"
          onClick={handleAddTask}
        >
          Add Task
        </button>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 md:hidden"
          onClick={handleAddTask}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>
      <div className="flex flex-col">
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="mt-2">
              {task.text}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Task;
