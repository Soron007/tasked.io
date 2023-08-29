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

const initialState: kanbanBoardType = {
  boards: [],
  backgroundColor: "green",
};

const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    addBoard: (state, action: PayloadAction<string>) => {
      const newBoardId = Date.now().toString();
      state.boards.push({ id: newBoardId, title: action.payload, tasks: [] });
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
      }
    },
    setbackgroundColor: (state, action: PayloadAction<string>) => {
      state.backgroundColor = action.payload;
    },
    deleteBoard: (state, action: PayloadAction<string>) => {
      const boardIndex = state.boards.findIndex(
        (board) => board.id === action.payload
      );
      if (boardIndex !== -1) {
        state.boards.splice(boardIndex, 1);
      }
    },
  },
});

export const { addBoard, addTask, setbackgroundColor, deleteBoard } =
  kanbanSlice.actions;

export default kanbanSlice.reducer;
