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
  backgroundColor: "#ffffff",
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
  },
});

export const { addBoard, addTask, setbackgroundColor } = kanbanSlice.actions;

export default kanbanSlice.reducer;
