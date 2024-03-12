import { BrowserRouter, Route, Routes } from "react-router-dom";
import Wrapper from "../pages/Wrapper";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route key={Math.random()} path={"/"} element={<Wrapper />} />
          <Route
            path="*"
            element={
              <Wrapper>
                <p className="text-4xl text-gray-500 text-center my-32">
                  Not Found
                </p>
              </Wrapper>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
