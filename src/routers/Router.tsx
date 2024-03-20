import { BrowserRouter, Route, Routes } from "react-router-dom";
import Wrapper from "../pages/Wrapper";
import Admin from "../modules/Admin";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route key={Math.random()} path={"/"} element={<Wrapper />} />
          <Route key={Math.random()} path={"/admin"} element={<Admin />} />
          <Route key={Math.random()} path={"/admin/*"} element={<Admin />} />

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
