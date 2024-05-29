import { useContext, useState } from "react";
import AutoComplete from "../../../../components/AutoComplete";
import ItemListComponent from "./ItemListComponent";
import Button from "../../../../components/Button";
import {
  addContentByIdComponent,
  addContentListByIdComponent,
} from "../../../Admin/apis";
import { ContentPageContext } from "../../../Admin/ContentPage/ContentPageProvider";
import Content from "../../../Admin/interfaces/Content";
import ContentList from "../../../Admin/interfaces/ContentList";
import TaskbarContent from "./TaskbarContent";

const ListComponent = ({ item }: { item: Content }) => {
  //
  const {
    custom: { result },
    dispatch,
    actions: { updateData },
  } = useContext(ContentPageContext);
  const options = ["", "•", "🔹", "✓", "♦", "✔️", "🟦"];
  const [selected, setSelected] = useState(item.text || options[0]);
  const [list, setList] = useState<ContentList[]>(item.list || []);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const handleDelete = async () => {
    if (!result) return;
    setDeleteLoading(true);
    if (list.length !== 0) {
      await addContentByIdComponent(result.id, {
        ...item,
        list: [],
      });
    }

    dispatch(
      updateData("result", {
        ...result,
        contents: result?.contents.filter((_) => _.id !== item.id),
      })
    );
  };
  //
  return (
    <div>
      {result && (
        <div className="mt-8 mb-2 flex items-center gap-3">
          <AutoComplete<string>
            options={options}
            placeholder="Mode"
            itemHandle={(e) => setSelected(e)}
            defaultValue={selected}
          />
          <Button
            mode="outlined"
            disabled={!list.length}
            handleClick={async () => {
              await addContentListByIdComponent(item.id, {
                ...item,
                list: list,
                text: selected,
              });
            }}
          >
            Save
          </Button>
        </div>
      )}
      <ul className={`my-6`}>
        {list.map((contentList: ContentList) => (
          <li key={contentList.id} className="mb-2 flex items-start gap-3">
            <span className="text-sm mt-1">{selected}</span>
            <ItemListComponent
              item={contentList}
              content={{ ...item, text: selected }}
              list={list}
              setList={setList}
            />
          </li>
        ))}
        {result && (
          <li className="pl-2 flex items-center gap-4">
            <Button
              mode="outlined"
              handleClick={() => {
                setList([
                  ...list,
                  {
                    id: Math.random(),
                    text: "Description",
                    isNew: true,
                    index: list.length + 1,
                  },
                ]);
              }}
            >
              Add item
            </Button>
            <TaskbarContent
              deleteLoading={deleteLoading}
              saveLoading={false}
              edit={false}
              handleDelete={handleDelete}
              handleSave={() => ""}
              hidden={["save"]}
              content={item}
            />
          </li>
        )}
      </ul>
    </div>
  );
};

export default ListComponent;
