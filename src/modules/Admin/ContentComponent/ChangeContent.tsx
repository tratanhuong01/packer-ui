import { useContext } from "react";
import Popover from "../../../components/Popover";
import ModeContent from "./ModeContent";
import { ContentPageContext } from "../ContentPage/ContentPageProvider";
import Content from "../interfaces/Content";

const ChangeContent = ({ content }: { content: Content }) => {
  //
  const {
    custom: { result },
    dispatch,
    actions: { updateData },
  } = useContext(ContentPageContext);
  const handleClick = (item: string) => {
    if (!result) return;
    let temp = [...result.contents];
    const index = result.contents.findIndex(
      (content_) => content_.id === content.id
    );
    if (index !== -1) {
      content.type = item.toLowerCase();
      temp[index] = content;
    }
    dispatch(updateData("result", { ...result, contents: temp }));
  };
  //
  return (
    <Popover
      component={
        <div className="w-40">
          <ModeContent handleClick={handleClick} />
        </div>
      }
    >
      <i className="bx bx-dots-horizontal text-green-700" />
    </Popover>
  );
};

export default ChangeContent;
