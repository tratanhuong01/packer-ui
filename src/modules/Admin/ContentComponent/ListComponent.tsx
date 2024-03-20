import { useContext, useEffect, useRef, useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Modal from "../../../components/Modal";
import AutoComplete from "../../../components/AutoComplete";
import { AdminContext } from "../../../contexts/AdminContext/AdminContext";

const ListComponent = ({
  closeModal,
  index,
  handleSubmit,
}: {
  closeModal: Function;
  index: number;
  handleSubmit: (item: { id: number; value: string }[]) => void;
}) => {
  //
  const {
    admin: { content },
  } = useContext(AdminContext);
  const refContent = useRef<HTMLDivElement>(null);
  const [list, setList] = useState<{ id: number; value: string }[]>([]);
  useEffect(() => {
    if (refContent.current) {
      refContent.current.scrollTop = refContent.current.scrollHeight;
    }
  }, [list]);
  useEffect(() => {
    if (index !== -1) {
      const findIndex = content.findIndex((item) => item.id === index);
      if (findIndex !== -1) {
        if (typeof content[findIndex].content === "string") return;
        const items: string[] = content[findIndex].content as string[];
        setList(
          items.map((item: string) => {
            return {
              id: Math.random(),
              value: item,
            };
          })
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);
  //
  return (
    <Modal
      width={500}
      headerTitle="Add List Content"
      closeModal={closeModal}
      footerButtonRender={
        <div className="flex justify-end p-2">
          <Button mode="outlined" handleClick={() => handleSubmit(list)}>
            Save
          </Button>
        </div>
      }
    >
      <AutoComplete options={["disc", "none", "decimal"]} />
      <hr className="my-2 block pb-2" />
      <div
        ref={refContent}
        className="py-2 overflow-y-scroll h-64 scroll-smooth"
      >
        {list.map((item, index) => (
          <div className="flex items-center gap-2 mb-4">
            <Input
              type="text"
              className="flex-1"
              value={item.value}
              key={item.id}
              handleChange={(e) => {
                const indexList = list.findIndex((_) => _.id === item.id);
                let listClone = [...list];
                listClone[indexList] = { ...item, value: e };
                setList([...listClone]);
              }}
              placeholder={"Item list " + index + 1}
            />
            <Button
              width={40}
              handleClick={() =>
                setList([...list].filter((_) => _.id !== item.id))
              }
            >
              <i className="bx bx-x text-red-500 text-xl"></i>
            </Button>
            <Button mode="text">{index + 1}</Button>
          </div>
        ))}
      </div>
      <div className="flex justify-center py-4">
        <Button
          handleClick={() =>
            setList([...list, { id: Math.random(), value: "" }])
          }
        >
          Add
        </Button>
      </div>
    </Modal>
  );
};

export default ListComponent;
