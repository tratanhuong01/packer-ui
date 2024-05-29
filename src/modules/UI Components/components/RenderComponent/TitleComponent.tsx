import { memo, useContext, useState } from "react";
import TitleDescription from "../TitleDescription";
import {
  addContentByIdComponent,
  deleteContentByIdComponent,
} from "../../../Admin/apis";
import { ContentPageContext } from "../../../Admin/ContentPage/ContentPageProvider";
import Content from "../../../Admin/interfaces/Content";
import TaskbarContent from "./TaskbarContent";

type TitleComponentProps = {
  item: Content;
  type: "big" | "normal" | "description";
};

const TitleComponent = ({ item, type }: TitleComponentProps) => {
  //
  const {
    custom: { result },
    dispatch,
    actions: { updateData },
  } = useContext(ContentPageContext);
  const [edit, setEdit] = useState(item.isNew ? true : false);
  const [child, setChild] = useState<Content>(item);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  //
  return (
    <div className="relative inline-block w-auto text-wrap z-10">
      <TitleDescription
        type={type}
        isEditor={edit}
        onInput={(e: any) => {
          if (!result) return;

          setEdit(true);
          setChild({ ...child, text: e });
          let temp = [...result.contents];
          const index = temp.findIndex((_: any) => _.id === item.id);
          if (index !== -1) {
            temp[index].text = e;
          }
          dispatch(updateData("result", { ...result, contents: temp }));
        }}
        onDoubleClick={() => result && setEdit(true)}
        onBlur={() => {
          if (!edit || !result) return;
          // setEdit(false);
        }}
      >
        {child.text}
      </TitleDescription>
      {result && (
        <div
          className="absolute top-1/2 transform-y-center left-full pl-3 flex 
          items-center gap-3"
        >
          <TaskbarContent
            deleteLoading={deleteLoading}
            edit={edit}
            saveLoading={editLoading}
            content={item}
            handleDelete={async () => {
              setDeleteLoading(true);
              setEdit(!edit);
              if (!edit) await deleteContentByIdComponent(result?.id, child.id);
              dispatch(
                updateData("result", {
                  ...result,
                  contents: result.contents.filter(
                    (content: Content) => content.id !== child.id
                  ),
                })
              );
              setDeleteLoading(true);
            }}
            handleSave={async () => {
              setEditLoading(true);
              if (edit) {
                let newItem = { ...child };
                delete newItem.isNew;
                newItem.list = [];
                await addContentByIdComponent(result.id, newItem);
              }
              setEdit(!edit);
              setEditLoading(false);
            }}
            hidden={[]}
          />
        </div>
      )}
    </div>
  );
};

export default memo(TitleComponent);
