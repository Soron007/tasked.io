import { useState } from "react";
import { addTask } from "../store/kanbanSlice";
import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";

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
      <div className="flex flex-col w-full">
        <ul>
          {tasks.map((task) => (
            <>
              <li
                key={task.id}
                className="mt-2 p-2 border-2 border-purple-500 flex items-center justify-between bg-slate-500/[0.6] rounded-lg duration-300 hover:scale-y-95 cursor-pointer"
              >
                <span className="overflow-auto font-mono font-bold text-2xl">
                  {task.text}
                </span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </span>
              </li>
            </>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Task;
