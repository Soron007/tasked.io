import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, deleteTasks, editTasks } from "../store/kanbanSlice";
import { AppDispatch } from "../store/store";
import { AiTwotoneDelete, AiFillEdit } from "react-icons/ai";
import { MdCancel } from "react-icons/md";

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
  const [editText, setEditText] = useState<string>("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

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

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTasks({ boardId, taskId }));
  };

  const handleEditTask = (taskId: string, newText: string) => {
    dispatch(editTasks({ boardId, taskId, newText }));
    setEditingTaskId(null);
  };

  return (
    <>
      <h2 className="font-mono text-lg font-bold mt-1 mb-2">Tasks:</h2>
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="add task"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          className="p-1 w-[50%] outline-purple-600 border border-gray-500 rounded-lg placeholder:text-center"
        />

        <button
          className="text-lg items-center ml-2 bg-slate-300 py-1 rounded-lg hover:bg-green-600 px-3 md:flex"
          onClick={handleAddTask}
        >
          +
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
          {/* ... */}
        </svg>
      </div>
      <div className="flex flex-col w-full">
        <ul>
          {tasks.map((task) => (
            <div key={task.id}>
              <li className="mt-2 p-2 border-2 border-purple-500 flex items-center justify-between bg-slate-500/[0.6] rounded-lg duration-300 hover:scale-y-95 cursor-pointer">
                {editingTaskId === task.id ? (
                  <input
                    type="text"
                    value={editText}
                    className="p-2 placeholder:text-center outline-none rounded-md"
                    placeholder="Enter new text"
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleEditTask(task.id, taskText);
                      }
                    }}
                  />
                ) : (
                  <span className="overflow-auto font-mono font-bold text-2xl">
                    {task.text}
                  </span>
                )}
                <span className="flex ml-2 gap-2">
                  {editingTaskId === task.id ? (
                    <button onClick={() => handleEditTask(task.id, editText)}>
                      <MdCancel />
                    </button>
                  ) : (
                    <button onClick={() => setEditingTaskId(task.id)}>
                      <AiFillEdit />
                    </button>
                  )}
                  <AiTwotoneDelete onClick={() => handleDeleteTask(task.id)} />
                </span>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Task;
