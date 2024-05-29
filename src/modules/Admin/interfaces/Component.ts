import Prop from "./Prop";
import Content from "./Content";

interface Component {
  id: number;
  name: string;
  type: string;
  contents: Content[];
  props: Prop[];
}

export default Component;
