import { useContext } from "react";
import Button from "../../../components/Button";
import Popover from "../../../components/Popover";
import RenderComponent from "../../UI Components/components/RenderComponent";
import { ContentPageContext } from "./ContentPageProvider";
import Content from "../interfaces/Content";
import Code from "../interfaces/Code";
import ModeContent from "../ContentComponent/ModeContent";

const ContentPageMain = () => {
  //
  const {
    custom: { result },
    dispatch,
    actions: { updateData },
  } = useContext(ContentPageContext);
  //
  return (
    <div className="pb-60 relative z-0">
      {<RenderComponent data={result?.contents || []} />}
      <Popover
        className="my-3"
        component={
          <ModeContent
            handleClick={(_: string) => {
              if (!result) return;
              let data: Content[];
              const component: Code = {
                code: {
                  expand: "!--Expand code here--!",
                  collapse: "!--Collapse code here--!",
                },
                name: result.name,
              };
              switch (_) {
                case "Show":
                  data = [
                    ...(result.contents || []),
                    {
                      id: Math.random(),
                      text: result.name,
                      list: [],
                      type: "show",
                      code: component,
                      index: result.contents ? result.contents.length + 1 : 0,
                      isNew: true,
                    },
                  ];
                  break;
                case "List":
                  data = [
                    ...(result.contents || []),
                    {
                      id: Math.random(),
                      text: "",
                      list: [],
                      type: "list",
                      code: component,
                      index: result.contents ? result.contents.length + 1 : 0,
                      isNew: true,
                    },
                  ];
                  break;
                default:
                  data = [
                    ...(result.contents || []),
                    {
                      id: Math.random(),
                      text: result.name,
                      list: [],
                      type: _.toLowerCase(),
                      code: component,
                      index: result.contents ? result.contents.length + 1 : 0,
                      isNew: true,
                    },
                  ];
                  break;
              }
              dispatch(updateData("result", { ...result, contents: data }));
            }}
          />
        }
      >
        <Button mode="primary">Add content</Button>
      </Popover>
    </div>
  );
};

export default ContentPageMain;
