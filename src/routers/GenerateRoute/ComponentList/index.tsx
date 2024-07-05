import TransferList from "../../../components/TransferList";
import VideoMedia from "../../../components/VideoMedia";
import LibraryManager from "../../../pages/LibraryManage";
import AutoCompletePage from "../../../pages/components/AutoComplete";
import ButtonPage from "../../../pages/components/Button";
import CalendarPage from "../../../pages/components/Calendar";
import InputPage from "../../../pages/components/Input";
import ModalPage from "../../../pages/components/Modal";
import OTPVerifyPage from "../../../pages/components/OTPVerify/OTPVerifyPage";
import PaginationPage from "../../../pages/components/Pagination";
import RatingPage from "../../../pages/components/Rating";
import TablePage from "../../../pages/components/Table";
import { ItemGenerateChild } from "../type";

const input: ItemGenerateChild = {
  id: Math.random(),
  name: "Input",
  type: "app",
  component: <InputPage />,
};
const button: ItemGenerateChild = {
  id: Math.random(),
  name: "Button",
  type: "app",
  component: <ButtonPage />,
};
const calendar: ItemGenerateChild = {
  id: Math.random(),
  name: "Calendar",
  type: "app",
  component: <CalendarPage />,
};
const otp: ItemGenerateChild = {
  id: Math.random(),
  name: "OTP",
  type: "app",
  component: <OTPVerifyPage />,
};
const autoComplete: ItemGenerateChild = {
  id: Math.random(),
  name: "Auto Complete",
  type: "app",
  component: <AutoCompletePage />,
};
const modal: ItemGenerateChild = {
  id: Math.random(),
  name: "Modal",
  type: "app",
  component: <ModalPage />,
};
const rating: ItemGenerateChild = {
  id: Math.random(),
  name: "Rating",
  type: "app",
  component: <RatingPage />,
};
const transferList: ItemGenerateChild = {
  id: Math.random(),
  name: "Transfer List",
  type: "app",
  component: <TransferList getItems={async () => []} />,
};
const pagination: ItemGenerateChild = {
  id: Math.random(),
  name: "Pagination",
  type: "app",
  component: <PaginationPage />,
};
const tooltip: ItemGenerateChild = {
  id: Math.random(),
  name: "Tooltip",
  type: "app",
  component: <p>Tooltip</p>,
};
const popover: ItemGenerateChild = {
  id: Math.random(),
  name: "Popover",
  type: "app",
  component: <p>Popover</p>,
};
const table: ItemGenerateChild = {
  id: Math.random(),
  name: "Table",
  type: "app",
  component: <TablePage />,
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
const libraryManager: ItemGenerateChild = {
  id: Math.random(),
  name: "Library Manager",
  type: "app",
  component: <LibraryManager />,
  isFull: true,
};

const ComponentList: ItemGenerateChild[] = [
  input,
  button,
  calendar,
  otp,
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
  libraryManager,
];

// eslint-disable-next-line import/no-anonymous-default-export
export default ComponentList;
