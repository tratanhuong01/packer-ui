import RenderData from "../components/RenderData";
import TicAndToe from "../pages/TicAndToe";
import VSCodeEditorMini from "../components/VSCodeEditorMini";
import AutoCompletePage from "../pages/AutoComplete";
import ButtonPage from "../pages/Button";
import CalendarPage from "../pages/Calendar";
import Coder from "../pages/Coder";
import Components from "../pages/Components";
import InputPage from "../pages/Input";
import ModalPage from "../pages/Modal";
import RatingPage from "../pages/Rating";
import ChatGPT from "../pages/ChatGPT";

const projectRoutes = [
  {
    path: "/",
    name: "ChatGPT",
    component: <ChatGPT />,
  },
  {
    path: "/components",
    name: "Components",
    component: <Components />,
  },
  {
    path: "/game",
    name: "game",
    component: <TicAndToe />,
  },
  {
    path: "/vscode",
    name: "Visual Studio Code",
    component: <VSCodeEditorMini />,
  },
  {
    path: "/render",
    name: "Render",
    component: <RenderData />,
  },
  {
    path: "/coder",
    name: "Coder",
    component: <Coder />,
  },
  {
    path: "/component/auto-complete",
    name: "Auto complete",
    component: <AutoCompletePage />,
  },
  {
    path: "/component/calendar",
    name: "Calendar",
    component: <CalendarPage />,
  },
  {
    path: "/component/button",
    name: "Button",
    component: <ButtonPage />,
  },
  {
    path: "/component/input",
    name: "Input",
    component: <InputPage />,
  },
  {
    path: "/component/modal",
    name: "Modal",
    component: <ModalPage />,
  },
  {
    path: "/component/rating",
    name: "Rating",
    component: <RatingPage />,
  },
];

export default projectRoutes;
