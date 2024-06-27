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
  isFull: true,
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
  isFull: true,
};
const overview: ItemGenerateChild = {
  id: Math.random(),
  name: "Usage",
  type: "app",
  component: <Usage />,
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
  usage,
  vsCode,
];

export default GettingStarted;
//
