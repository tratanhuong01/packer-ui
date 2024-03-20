import { TicAndToeProvider } from "../../contexts/TicAndToeContext/TicAndToeContext";
import AppContainer from "./containers/AppContainer";

const TicAndToe = () => {
  return (
    <TicAndToeProvider>
      <AppContainer />
      <div id="tic-and-toe-modal"></div>
    </TicAndToeProvider>
  );
};

export default TicAndToe;
