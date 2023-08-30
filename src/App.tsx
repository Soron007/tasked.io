import Board from "./components/Board";
import Header from "./components/Header";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
const App: React.FC = () => {
  const backgroundColor = useSelector(
    (state: RootState) => state.kanban.backgroundColor
  );

  return (
    <>
      <Header />
      <div style={{ backgroundColor }} className="min-h-[100vh] ">
        <Board />
      </div>
    </>
  );
};

export default App;
