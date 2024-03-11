import { BrowserRouter, Route, Routes } from "react-router-dom";
import projectRoutes from "./projectRoutes";
import Wrapper from "../pages/Wrapper";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          {projectRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                route.path === "/" ||
                route.path === "/vscode" ||
                route.path === "/game" ? (
                  route.component
                ) : (
                  <Wrapper>{route.component}</Wrapper>
                )
              }
            />
          ))}
          <Route
            path="*"
            element={
              <Wrapper>
                <p></p>
              </Wrapper>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
