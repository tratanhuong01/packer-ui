import Code from "./Code";
import ContentList from "./ContentList";

interface Content {
  id: number;
  text: string;
  list: ContentList[];
  type: string;
  code: Code;
  index: number;
  isNew?: boolean;
}

export default Content;
