import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBoard, deleteBoard, editBoardTitle } from "../store/kanbanSlice";
import { AppDispatch, RootState } from "../store/store";
import {
  selectBoard,
  deselectBoard,
  clearSelection,
} from "../store/boardSelectionSlice";
import { GrRadialSelected } from "react-icons/gr";
import { BsCircle } from "react-icons/bs";
import { AiTwotoneDelete, AiFillEdit } from "react-icons/ai";
import { MdCancel } from "react-icons/md";

import Task from "./Task";

const Board: React.FC = () => {
  const [boardTitle, setBoardTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [editingBoardId, setEditingBoardId] = useState<string | null>(null);
  const [editedBoardTitles, setEditedBoardTitles] = useState<{
    [boardId: string]: string;
  }>({});

  const dispatch: AppDispatch = useDispatch();

  const boards = useSelector((state: RootState) => state.kanban.boards);

  const selectedBoards = useSelector(
    (state: RootState) => state.selection.selectedBoards
  );

  const handleDeleteSelected = () => {
    selectedBoards.forEach((boardId) => {
      dispatch(deleteBoard(boardId));
    });
    dispatch(clearSelection());
  };

  const handleAddBoard = () => {
    if (boardTitle.trim() !== "") {
      dispatch(addBoard(boardTitle));

      setBoardTitle("");
      setError(null);
    } else {
      setError("You need to input something, bruh!");
    }
  };

  const handleDeleteBoard = (boardId: string) => {
    dispatch(deleteBoard(boardId));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddBoard();
    }
  };

  const handleEditBoardTitle = (boardId: string) => {
    const newTitle =
      editedBoardTitles[boardId] ||
      boards.find((board) => board.id === boardId)?.title ||
      "";

    dispatch(editBoardTitle({ boardId, newTitle }));
    setEditingBoardId(null);
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
          className="bg-slate-300 text-black rounded-md p-2 hover:bg-green-600 hidden md:block md:text-xl"
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

      {selectedBoards.length > 0 && boards.length > 0 && (
        <span
          onClick={handleDeleteSelected}
          className="hover:text-red-500 cursor-pointer"
        >
          <AiTwotoneDelete className="h-8 w-8" />
        </span>
      )}

      {/* Boards displayed over here */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {boards.map((board) => (
          <div
            className={`rounded-md border-2 ${
              error ? "border-red-600" : "border-black"
            } md:m-4 md:p-4 m-2 p-2 flex flex-col items-start`}
            key={board.id}
          >
            {/* edit, and delete board functions below */}
            <div className="flex w-full justify-between items-center">
              {editingBoardId === board.id ? (
                <input
                  type="text"
                  value={editedBoardTitles[board.id] || ""}
                  className="p-2 rounded-md outline-none"
                  placeholder="Enter new title"
                  onChange={(e) =>
                    setEditedBoardTitles({
                      ...editedBoardTitles,
                      [board.id]: e.target.value,
                    })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleEditBoardTitle(board.id);
                    }
                  }}
                />
              ) : (
                <span className="text-black font-mono font-semibold text-2xl md:text-3xl">
                  {board.title}
                </span>
              )}

              <span className="cursor-pointer flex gap-2">
                {editingBoardId === board.id ? (
                  <button onClick={() => setEditingBoardId(null)}>
                    <MdCancel className="text-white h-6 w-6 ml-2 md:ml-2" />
                  </button>
                ) : (
                  <button onClick={() => setEditingBoardId(board.id)}>
                    <AiFillEdit className="text-white h-6 w-6" />
                  </button>
                )}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                  onClick={() => handleDeleteBoard(board.id)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </span>
            </div>

            <div className="border-2 border-gray-800 w-[80%] mt-3"></div>

            {/* Below are the individual tasks in each board */}

            <Task boardId={board.id} tasks={board.tasks} />

            {/* Below is the button to select and deselect individual boards */}
            <button
              onClick={() => {
                if (selectedBoards.includes(board.id)) {
                  dispatch(deselectBoard(board.id));
                } else {
                  dispatch(selectBoard(board.id));
                }
              }}
              className={`mt-2 py-1 px-2 rounded-md ${
                selectedBoards.includes(board.id)
                  ? "bg-green-500"
                  : "text-gray-300"
              }`}
            >
              {selectedBoards.includes(board.id) ? (
                <GrRadialSelected className="text-black" />
              ) : (
                <BsCircle className="text-black" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
