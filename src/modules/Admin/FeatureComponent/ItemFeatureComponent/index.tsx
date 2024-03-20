import { ChangeEvent, useContext, useState } from "react";
import ItemDataTypes from "../ItemDataTypes";
import { AdminContext } from "../../../../contexts/AdminContext/AdminContext";
import Input from "../../../../components/Input";
import { PropItem } from "../../../../contexts/AdminContext/types";
import Tooltip from "../../../../components/Tooltip";

const ItemFeatureComponent = ({ prop }: { prop: PropItem }) => {
  const {
    admin: {
      props: { done, component },
    },
    dispatch,
    actions: { updateProps },
  } = useContext(AdminContext);
  const [showModal, setShowModal] = useState(false);
  const handleChange = (
    e: string | boolean,
    type: "optional" | "value",
    prop: PropItem
  ) => {
    let propsNew = [...component];
    const propNew = { ...prop, [type]: e };
    const index = component.findIndex((_) => _.id === prop.id);
    if (index === -1) return;
    propsNew[index] = propNew;
    dispatch(updateProps("component", [...propsNew]));
  };
  return (
    <div className="mb-5">
      <div className="flex items-center gap-4 mb-3">
        <Input
          type="text"
          placeholder="Value"
          value={prop.value}
          width={180}
          spellcheck={false}
          handleChange={(e: string) => handleChange(e, "value", prop)}
        />
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            className="scale-150"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(e.target.checked, "optional", prop)
            }
            checked={prop.optional}
          />
          <span>Optional</span>
        </div>
        <Tooltip title="Add object" position="bottom">
          <i
            onClick={() => setShowModal(true)}
            className="bx bx-dots-horizontal text-2xl cursor-pointer"
          />
        </Tooltip>
        <Tooltip
          title="Delete"
          position="bottom"
          handleClick={() =>
            dispatch(
              updateProps(
                "component",
                [...component].filter((_) => prop.id !== _.id)
              )
            )
          }
        >
          <span className="bx bx-x text-2xl cursor-pointer text-red-500"></span>
        </Tooltip>
        <Tooltip
          title="Add"
          position="bottom"
          handleClick={() => {
            if (prop.value) {
              dispatch(
                updateProps(
                  "component",
                  [...component].filter((_) => prop.id !== _.id)
                )
              );
              dispatch(updateProps("done", [...done, prop]));
            }
          }}
        >
          <span
            className={`bx bx-check text-2xl cursor-${
              prop.value ? "pointer" : "not-allowed"
            } text-${prop.value ? "green" : "gray"}-500 mr-10`}
          ></span>
        </Tooltip>

        {showModal && (
          <ItemDataTypes closeModal={() => setShowModal(false)} prop={prop} />
        )}
      </div>

      <div className="py-2">
        <Tooltip
          title={
            prop.dataType.detail.length === 0 ? (
              prop.dataType.type
            ) : (
              <ul>
                {prop.dataType.detail.map((item) => (
                  <li key={item.id}>- {item.value}</li>
                ))}
              </ul>
            )
          }
          position="bottom"
        >
          <span className="text-white bg-blue-500 px-2 py-1 rounded-full">
            {`${prop.value}${prop.optional ? "" : "?"}: ${prop.dataType.type}`}
          </span>
        </Tooltip>
      </div>
    </div>
  );
};

export default ItemFeatureComponent;
