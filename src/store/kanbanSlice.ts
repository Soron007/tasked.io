import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: string;
  text: string;
}

interface Board {
  id: string;
  title: string;
  tasks: Task[];
}

interface kanbanBoardType {
  boards: Board[];
  backgroundColor: string;
}

const initialState: kanbanBoardType = JSON.parse(
  localStorage.getItem("kanbanState") ||
    '{"boards":[],"backgroundColor":"white"}'
);

const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    addBoard: (state, action: PayloadAction<string>) => {
      const newBoardId = Date.now().toString();
      state.boards.push({ id: newBoardId, title: action.payload, tasks: [] });
      saveStateToLocalStorage(state);
    },
    addTask: (
      state,
      action: PayloadAction<{ boardId: string; task: Task }>
    ) => {
      const board = state.boards.find(
        (board) => board.id === action.payload.boardId
      );
      if (board) {
        board.tasks.push(action.payload.task);
        saveStateToLocalStorage(state);
      }
    },
    setbackgroundColor: (state, action: PayloadAction<string>) => {
      state.backgroundColor = action.payload;
      saveStateToLocalStorage(state);
    },
    deleteBoard: (state, action: PayloadAction<string>) => {
      const boardIndex = state.boards.findIndex(
        (board) => board.id === action.payload
      );
      if (boardIndex !== -1) {
        state.boards.splice(boardIndex, 1);
        saveStateToLocalStorage(state);
      }
    },
    deleteTasks: (
      state,
      action: PayloadAction<{ boardId: string; taskId: string }>
    ) => {
      const targetBoard = state.boards.find((board) => {
        return board.id === action.payload.boardId;
      });

      if (targetBoard) {
        const taskIndex = targetBoard.tasks.findIndex((task) => {
          return task.id === action.payload.taskId;
        });

        if (taskIndex !== -1) {
          targetBoard.tasks.splice(taskIndex, 1);
          saveStateToLocalStorage(state);
        }
      }
    },
    editBoardTitle: (
      state,
      action: PayloadAction<{ boardId: string; newTitle: string }>
    ) => {
      const targetBoard = state.boards.find(
        (board) => board.id === action.payload.boardId
      );
      if (targetBoard) {
        targetBoard.title = action.payload.newTitle;
        saveStateToLocalStorage(state);
      }
    },
    editTasks: (
      state,
      action: PayloadAction<{
        boardId: string;
        taskId: string;
        newText: string;
      }>
    ) => {
      const targetBoard = state.boards.find(
        (board) => board.id === action.payload.boardId
      );

      if (targetBoard) {
        const targetTask = targetBoard.tasks.find(
          (task) => task.id === action.payload.taskId
        );
        if (targetTask) {
          targetTask.text = action.payload.newText;
          saveStateToLocalStorage(state);
        }
      }
    },
  },
});

//helper function for localStorage
function saveStateToLocalStorage(state: kanbanBoardType) {
  localStorage.setItem("kanbanState", JSON.stringify(state));
}

export const {
  addBoard,
  addTask,
  setbackgroundColor,
  deleteBoard,
  deleteTasks,
  editBoardTitle,
  editTasks,
} = kanbanSlice.actions;

export default kanbanSlice.reducer;
