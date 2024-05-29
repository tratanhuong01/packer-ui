import { useContext, useState } from "react";
import TitleDescription from "../TitleDescription";
import { addContentListByIdComponent } from "../../../Admin/apis";
import { ContentPageContext } from "../../../Admin/ContentPage/ContentPageProvider";
import Content from "../../../Admin/interfaces/Content";
import ContentList from "../../../Admin/interfaces/ContentList";
import TaskbarContent from "./TaskbarContent";

const ItemListComponent = ({
  item,
  content,
  list,
  setList,
}: {
  item: ContentList;
  content: Content;
  list: ContentList[];
  setList: Function;
}) => {
  //
  const {
    custom: { result },
  } = useContext(ContentPageContext);
  const [edit, setEdit] = useState(item.isNew ? true : false);
  const [child, setChild] = useState<ContentList>(item);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  //
  return (
    <div className="relative inline-block w-auto text-wrap">
      <TitleDescription
        type={"description"}
        isEditor={edit}
        onInput={(e: any) => {
          setChild({ ...child, text: e });
        }}
        onDoubleClick={() => setEdit(true)}
      >
        {child.text}
      </TitleDescription>
      {result && (
        <div
          className="absolute top-1/2 transform-y-center left-full pl-3 flex 
            items-center gap-3"
        >
          <TaskbarContent
            content={content}
            deleteLoading={deleteLoading}
            edit={edit}
            saveLoading={editLoading}
            handleDelete={async () => {
              setDeleteLoading(true);
              let newItem = { ...child };

              if (child.isNew) {
              } else {
                delete newItem.isNew;
                delete content.isNew;
                const temp = [...list].filter((_) => _.id !== newItem.id);
                await addContentListByIdComponent(result.id, {
                  ...content,
                  list: temp,
                });

                setList(temp);
              }
            }}
            handleSave={async () => {
              setEditLoading(true);
              if (edit) {
                let newItem = { ...child };
                delete newItem.isNew;
                delete content.isNew;
                const index = list.findIndex((item) => item.id === newItem.id);
                let temp = [...list];
                content.list = temp;
                if (index !== -1) {
                  temp[index] = newItem;
                }
                await addContentListByIdComponent(result.id, content);

                setList(temp);
              }
              setEdit(!edit);
              setEditLoading(false);
            }}
            hidden={["change"]}
          />
        </div>
      )}
    </div>
  );
};

export default ItemListComponent;
