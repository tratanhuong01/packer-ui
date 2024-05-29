import { AppProvider } from "./contexts/AppContext/AppContext";
import Router from "./routers/Router";
//
const App = () => {
  //

  //
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
};

export default App;
