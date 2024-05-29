import { useContext, useEffect, useRef, useState } from "react";
import AutoComplete from "../../../components/AutoComplete";
import Button from "../../../components/Button";
import TextComponent from "./TextComponent";
import ListComponent from "./ListComponent";
import DisplayComponent from "./DisplayComponent";
import { AdminContext } from "../../../contexts/AdminContext/AdminContext";
import { AdminContentType } from "../../../contexts/AdminContext/types";
import Popover from "../../../components/Popover";

const WrapperContent = ({
  item,
  setShowModal,
}: {
  item: AdminContentType;
  setShowModal: Function;
}) => {
  const {
    admin: { content },
    dispatch,
    actions: { updateContent },
  } = useContext(AdminContext);
  const ComponentShow = ({ item }: { item: AdminContentType }) => {
    switch (item.type) {
      case "description":
      case "title":
      case "normal":
        return <TextComponent item={item} />;
      case "list":
        return (
          <Popover
            component={
              <ul
                className="w-80 cursor-pointer hover:bg-gray-100 border border-solid border-gray-300 
              shadow-lg p-2 rounded-lg"
              >
                {typeof item.content === "object"
                  ? item.content.map((item: any) => <li key={item}>{item}</li>)
                  : item.content}
              </ul>
            }
          >
            List
          </Popover>
        );
      case "show":
        return <>Component</>;
      default:
        return <></>;
    }
  };
  return (
    <div>
      <div className="mb-4">
        <div className="py-2 flex justify-between">
          <span></span>
          <div className="flex text-xl gap-1 items-center">
            {(item.type === "show" || item.type === "list") && (
              <span
                onClick={() => setShowModal(item.type)}
                className="bx bx-pencil cursor-pointer text-red-500"
              ></span>
            )}
            <span
              onClick={() =>
                dispatch(
                  updateContent([...content].filter((_) => _.id !== item.id))
                )
              }
              className="bx bx-x text-3xl cursor-pointer text-red-500"
            ></span>
          </div>
        </div>
        {<ComponentShow item={item} />}
      </div>
    </div>
  );
};

const ContentComponent = () => {
  //
  const {
    admin: { content },
    dispatch,
    actions,
  } = useContext(AdminContext);
  const { updateContent, addContent } = actions;
  const options: string[] = ["title", "list", "show", "description", "normal"];
  const [showModal, setShowModal] = useState("");
  const [typeRender, setTypeRender] = useState<
    "list" | "description" | "title" | "show" | "normal"
  >("title");
  const refContent = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    if (refContent.current) {
      refContent.current.scrollTop = refContent.current.scrollHeight;
    }
  }, []);
  //
  return (
    <div className="">
      <div
        ref={refContent}
        className="overflow-y-scroll scroll-smooth"
        style={{ height: content.length > 0 ? 300 : "auto" }}
      >
        {content.map((item) => (
          <WrapperContent
            item={item}
            key={item.id}
            setShowModal={setShowModal}
          />
        ))}
      </div>
      {showModal === "show" && (
        <DisplayComponent
          closeModal={() => setShowModal("")}
          index={index}
          handleSubmit={() => {
            setShowModal("");
          }}
        />
      )}
      {showModal === "list" && (
        <ListComponent
          index={index}
          closeModal={() => setShowModal("")}
          handleSubmit={(item: { id: number; value: string }[]) => {
            let newContent = [...content];
            const indexContent = newContent.findIndex(
              (item) => item.id === index
            );
            if (indexContent !== -1) {
              newContent[indexContent].content = item.map((item) => item.value);
              dispatch(updateContent(newContent));
              setShowModal("");
            }
          }}
        />
      )}
      <div className="flex items-center gap-3 mt-10">
        <AutoComplete
          options={options}
          placeholder="Type render"
          itemHandle={(item: any) => {
            setTypeRender(item);
          }}
          defaultValue={typeRender}
        />
        <Button
          type="button"
          mode="outlined"
          handleClick={() => {
            const id = Math.random();
            dispatch(
              addContent({
                id,
                content: "",
                type: typeRender,
                component: {
                  code: {
                    expand: "",
                    collapse: "",
                  },
                  name: "",
                  props: null,
                },
              })
            );
            setIndex(id);
            if (typeRender === "show" || typeRender === "list") {
              setShowModal(typeRender);
              return;
            }
          }}
        >
          Add item
        </Button>
      </div>
    </div>
  );
};

export default ContentComponent;
