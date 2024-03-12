import ComponentList from "./ComponentList";
import GettingStarted from "./GettingStarted";
import { ItemGenerateRoute } from "./type";

const GenerateRoute: ItemGenerateRoute[] = [
  {
    id: Math.random(),
    name: "Getting Start",
    items: GettingStarted,
  },
  {
    id: Math.random(),
    name: "Components",
    items: ComponentList,
  },
];

export default GenerateRoute;
