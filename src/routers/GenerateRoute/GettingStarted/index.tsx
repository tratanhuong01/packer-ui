import VSCodeEditorMini from "../../../components/VSCodeEditorMini";
import ChatGPT from "../../../modules/ChatGPT";
import Installation from "../../../modules/UI Components/pages/Installation";
import ListComponent from "../../../modules/UI Components/pages/ListComponent";
import Overview from "../../../modules/UI Components/pages/Overview";
import Usage from "../../../modules/UI Components/pages/Usage";
import { ItemGenerateChild } from "../type";

//
const chatGPT: ItemGenerateChild = {
  id: Math.random(),
  name: "Chat GPT",
  type: "app",
  component: <ChatGPT />,
};
const installation: ItemGenerateChild = {
  id: Math.random(),
  name: "Installation",
  type: "doc",
  component: <Installation />,
};
const listComponent: ItemGenerateChild = {
  id: Math.random(),
  name: "List Component",
  type: "component",
  component: <ListComponent />,
};
const overview: ItemGenerateChild = {
  id: Math.random(),
  name: "Usage",
  type: "app",
  component: <Usage />,
};
const ticAndToe: ItemGenerateChild = {
  id: Math.random(),
  name: "Tic and toe",
  type: "app",
  component: <p>Tic and toe</p>,
};
const uiCode: ItemGenerateChild = {
  id: Math.random(),
  name: "Visual Studio Code",
  type: "app",
  component: <VSCodeEditorMini />,
};
const usage: ItemGenerateChild = {
  id: Math.random(),
  name: "UI Code",
  type: "app",
  component: <p>UI Code</p>,
};
const vsCode: ItemGenerateChild = {
  id: Math.random(),
  name: "Overview",
  type: "app",
  component: <Overview />,
};

const GettingStarted: ItemGenerateChild[] = [
  chatGPT,
  installation,
  listComponent,
  overview,
  ticAndToe,
  uiCode,
  usage,
  vsCode,
];

export default GettingStarted;
//
