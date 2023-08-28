import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBoard } from "../store/kanbanSlice";
import { AppDispatch, RootState } from "../store/store";
import Task from "./Task";

const Board: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const boards = useSelector((state: RootState) => state.kanban.boards);

  const [boardTitle, setBoardTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleAddBoard = () => {
    if (boardTitle.trim() !== "") {
      dispatch(addBoard(boardTitle));

      setBoardTitle("");
      setError(null);
    } else {
      setError("You need to input something, bruh!");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddBoard();
    }
  };

  return (
    <div className="flex flex-col items-center mx-auto w-[80%] md:w-full">
      <div className="flex gap-2 mb-4 md:mb-6 mt-20">
        <input
          type="text"
          placeholder="Add Board Name"
          value={boardTitle}
          onChange={(e) => {
            setBoardTitle(e.target.value);
            setError(null);
          }}
          onKeyDown={handleKeyDown}
          className="border rounded-md md:p-2 md:mr-2 p-1 mr-1 placeholder:text-center outline-purple-600 md:text-xl border-black"
        />
        <button
          onClick={handleAddBoard}
          className="bg-slate-300 text-black rounded-md p-2 hover:bg-green-600 hidden md:block md:text-xl "
        >
          + Board
        </button>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 block md:hidden"
          onClick={handleAddBoard}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>
      {/* Error message over here */}
      {error && (
        <div className="text-red-500 translate-y-[2px] translate-x-[-30px] mb-5">
          {error}
        </div>
      )}

      {/* Boards displayed over here */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {boards.map((board) => (
          <div
            className={`rounded-md border-2 ${
              error ? "border-red-600" : "border-green-600"
            } md:m-4 md:p-4 m-2 p-2 flex flex-col items-start`}
            key={board.id}
          >
            <h2 className="text-purple-600 font-mono font-semibold md:text-xl text-lg">
              {board.title}
            </h2>

            <div className="border-2 border-gray-400 w-[80%] mt-3"></div>

            <Task boardId={board.id} tasks={board.tasks} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
