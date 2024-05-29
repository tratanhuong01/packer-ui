import { useContext, useState } from "react";
import Button from "../../../../components/Button";
import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";
import { ModalProps } from "../../../../components/Modal/type";
import { PropItem } from "../../../../contexts/AdminContext/types";
import { AdminContext } from "../../../../contexts/AdminContext/AdminContext";

const ItemDataTypes = ({
  closeModal,
  prop,
}: ModalProps & { prop: PropItem }) => {
  //
  const {
    admin: {
      props: { component },
    },
    actions: { updateProps },
    dispatch,
  } = useContext(AdminContext);
  const [type, setType] = useState(prop.dataType.type);
  const [fields, setFields] = useState<{ id: number; value: string }[]>(
    prop.isAdded
      ? [
          {
            id: Math.random(),
            value: "",
          },
        ]
      : prop.dataType.detail
  );
  //
  return (
    <Modal
      headerTitle={"DataTypes"}
      footerButtonRender={
        <div className="p-4 flex justify-end">
          <Button
            handleClick={() => {
              const index = component.findIndex((_) => _.id === prop.id);
              if (index !== -1) {
                let newComponent = [...component];
                newComponent[index].dataType = {
                  type,
                  detail: fields,
                };
                dispatch(updateProps("component", [...newComponent]));
              }
              closeModal && closeModal();
            }}
            mode="outlined"
            className="mt-2 w-full"
          >
            Add DataTypes
          </Button>
        </div>
      }
      closeModal={() => closeModal && closeModal(false)}
    >
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "1fr 1fr 1fr" }}
      >
        {["string", "number", "boolean", "object", "array"].map((item) => (
          <span
            onClick={() => {
              setType(item);
            }}
            className={`px-2 py-1 border border-primary border-solid cursor-pointer 
                  ${
                    type === item
                      ? "bg-primary text-white"
                      : "hover:bg-primary hover:text-white"
                  } text-center`}
            key={item}
          >
            {item}
          </span>
        ))}
      </div>
      {type === "object" && (
        <div>
          <div className="flex items-center gap-5 pt-8">
            <p className="font-semibold text-2xl">Add property</p>
            <Button
              handleClick={() =>
                setFields([...fields, { id: Math.random(), value: "" }])
              }
              mode="outlined"
            >
              <i className="bx bx-plus" />
            </Button>
          </div>
          <div
            className="grid gap-4 mt-4"
            style={{ gridTemplateColumns: "1fr 1fr 1fr" }}
          >
            {fields.map((item) => (
              <Input
                type="text"
                key={item.id}
                className="border-gray-500"
                handleChange={(e) => {
                  let fieldsNew = [...fields];
                  const index = [...fields].findIndex((_) => _.id === item.id);
                  if (index !== -1) {
                    fieldsNew[index] = { ...item, value: e };
                  }
                  setFields([...fieldsNew]);
                }}
                value={item.value}
              />
            ))}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ItemDataTypes;
