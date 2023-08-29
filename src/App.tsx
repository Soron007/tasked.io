import Board from "./components/Board";
import Header from "./components/Header";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
const App: React.FC = () => {
  const backgroundColor = useSelector(
    (state: RootState) => state.kanban.backgroundColor
  );

  return (
    <div style={{ backgroundColor }} className="h-screen">
      <Header />

      <Board />
    </div>
  );
};

export default App;
