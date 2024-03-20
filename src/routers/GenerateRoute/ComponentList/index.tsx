import VideoMedia from "../../../components/VideoMedia";
import { ItemGenerateChild } from "../type";

const input: ItemGenerateChild = {
  id: Math.random(),
  name: "Input",
  type: "app",
  component: <p>Input</p>,
};
const button: ItemGenerateChild = {
  id: Math.random(),
  name: "Button",
  type: "app",
  component: <p>button</p>,
};
const calendar: ItemGenerateChild = {
  id: Math.random(),
  name: "Calendar",
  type: "app",
  component: <p>Calendar</p>,
};
const autoComplete: ItemGenerateChild = {
  id: Math.random(),
  name: "Auto Complete",
  type: "app",
  component: <p>Auto Complete</p>,
};
const modal: ItemGenerateChild = {
  id: Math.random(),
  name: "Modal",
  type: "app",
  component: <p>Modal</p>,
};
const rating: ItemGenerateChild = {
  id: Math.random(),
  name: "Rating",
  type: "app",
  component: <p>Rating</p>,
};
const transferList: ItemGenerateChild = {
  id: Math.random(),
  name: "Transfer List",
  type: "app",
  component: <p>Transfer List</p>,
};
const pagination: ItemGenerateChild = {
  id: Math.random(),
  name: "Pagination",
  type: "app",
  component: <p>Pagination</p>,
};
const tooltip: ItemGenerateChild = {
  id: Math.random(),
  name: "Tooltip",
  type: "app",
  component: <p>Tooltip</p>,
};
const popover: ItemGenerateChild = {
  id: Math.random(),
  name: "popover",
  type: "app",
  component: <p>Popover</p>,
};
const table: ItemGenerateChild = {
  id: Math.random(),
  name: "Table",
  type: "app",
  component: <p>Table</p>,
};
const parent: ItemGenerateChild = {
  id: Math.random(),
  name: "Parent",
  type: "app",
  component: <p>Parent</p>,
};
const box: ItemGenerateChild = {
  id: Math.random(),
  name: "Box",
  type: "app",
  component: <p>Box</p>,
};
const alert: ItemGenerateChild = {
  id: Math.random(),
  name: "Alert",
  type: "app",
  component: <p>Alert</p>,
};
const videoMedia: ItemGenerateChild = {
  id: Math.random(),
  name: "Video Media",
  type: "app",
  component: <VideoMedia />,
};

const ComponentList: ItemGenerateChild[] = [
  input,
  button,
  calendar,
  alert,
  box,
  pagination,
  parent,
  table,
  popover,
  tooltip,
  transferList,
  modal,
  rating,
  autoComplete,
  videoMedia,
];

// eslint-disable-next-line import/no-anonymous-default-export
export default ComponentList;
