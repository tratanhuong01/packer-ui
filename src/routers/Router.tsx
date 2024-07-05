import { BrowserRouter, Route, Routes } from "react-router-dom";
import Wrapper from "../pages/Wrapper";
import Admin from "../modules/Admin";
import ComponentPage from "../modules/Admin/ComponentPage";
import PropPage from "../modules/Admin/PropPage";
import ContentPage from "../modules/Admin/ContentPage";
import Code from "../pages/Code";
import Projects from "../pages/projects";
import ChatGPT from "../modules/ChatGPT";
import ShareHistory from "../modules/ChatGPT/components/ShareHistory";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path={"/"} element={<Wrapper />} />
          <Route path={"/admin/*"} element={<Admin />} />
          <Route path={"/admin/component/"} element={<Admin />}>
            <Route path="dashboard" element={<ComponentPage />} />
            <Route path="add-props" element={<PropPage />} />
            <Route path="add-content" element={<ContentPage />} />
          </Route>
          <Route
            path={"/chat-gpt"}
            element={
              <div className="w-full h-screen overflow-hidden">
                <ChatGPT />
              </div>
            }
          />
          <Route
            path={"/chat-gpt/share/:historyId"}
            element={
              <ChatGPT>
                <ShareHistory />
              </ChatGPT>
            }
          />
          <Route
            path={"/chat-gpt/:historyId"}
            element={
              <div className="w-full h-screen overflow-hidden">
                <ChatGPT />
              </div>
            }
          />
          <Route path={"/code"} element={<Code />} />
          <Route path={"/projects"} element={<Projects />} />
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
