import { ChangeEvent, useContext, useState } from "react";
import ItemDataTypes from "../ItemDataTypes";
import { AdminContext } from "../../../../contexts/AdminContext/AdminContext";
import Input from "../../../../components/Input";
import { PropItem } from "../../../../contexts/AdminContext/types";
import Tooltip from "../../../../components/Tooltip";
import {
  addPropByIdComponent,
  deletePropByIdComponent,
  updatePropByIdComponent,
} from "../../apis";

const ItemFeatureComponent = ({
  prop,
  selected,
}: {
  prop: PropItem;
  selected: any;
}) => {
  const {
    admin: {
      props: { done, component },
    },
    dispatch,
    actions: { updateProps },
  } = useContext(AdminContext);
  const [showModal, setShowModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
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
  const disabled = done.findIndex((_) => _.id === prop.id) !== -1;
  return (
    <div className="mb-5">
      <div className={`flex items-center gap-4 mb-3`}>
        <Input
          type="text"
          placeholder="Value"
          className={disabled ? "opacity-50" : ""}
          value={prop.value}
          width={180}
          spellcheck={false}
          handleChange={(e: string) => handleChange(e, "value", prop)}
          disabled={disabled}
        />
        <div
          className={`flex items-center gap-3 ${disabled ? "opacity-50" : ""}`}
        >
          <input
            type="checkbox"
            className="scale-150"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(e.target.checked, "optional", prop)
            }
            disabled={disabled}
            checked={prop.optional}
          />
          <span>Optional</span>
        </div>
        <Tooltip title="Add object" position="bottom" disabled={disabled}>
          <i
            onClick={() => !disabled && setShowModal(true)}
            className={`bx bx-dots-horizontal text-2xl ${
              disabled ? "opacity-50" : "cursor-pointer"
            }`}
          />
        </Tooltip>
        <Tooltip
          disabled={disabled}
          title="Delete"
          position="bottom"
          handleClick={async () => {
            if (!prop.isAdded) {
              setIsDelete(true);
              await deletePropByIdComponent(prop.id, selected.id);
            }

            dispatch(
              updateProps(
                "component",
                [...component].filter((_) => prop.id !== _.id)
              )
            );
            dispatch(
              updateProps(
                "done",
                [...component].filter((_) => prop.id !== _.id)
              )
            );
            setIsDelete(false);
          }}
        >
          <span
            className={`bx bx-${
              isDelete ? "loader-alt animate-spin" : "x"
            } text-2xl cursor-pointer text-red-500`}
          ></span>
        </Tooltip>
        <Tooltip
          disabled={disabled}
          title={disabled ? "Edit" : "Add"}
          position="bottom"
          handleClick={async () => {
            if (prop.value) {
              if (disabled) {
                dispatch(
                  updateProps(
                    "done",
                    [...done].filter((_) => _.id !== prop.id)
                  )
                );
              } else {
                setIsEdit(true);
                if (!prop.dataType.detail) {
                  prop.dataType.detail = [];
                }
                if (prop.isAdded) {
                  await addPropByIdComponent(selected.id, prop);
                } else {
                  await updatePropByIdComponent(selected.id, prop);
                }
                prop.isAdded = false;
                dispatch(updateProps("done", [...done, prop]));
              }
              setIsEdit(false);
            }
          }}
        >
          <span
            className={`bx bx-${
              !isEdit
                ? disabled
                  ? "pencil text-base"
                  : "check text-2xl"
                : "loader-alt animate-spin"
            } cursor-${prop.value ? "pointer" : "not-allowed"} text-${
              prop.value ? (disabled ? "orange" : "green") : "gray"
            }-500 mr-10`}
          ></span>
        </Tooltip>

        {showModal && (
          <ItemDataTypes closeModal={() => setShowModal(false)} prop={prop} />
        )}
      </div>

      <div className="py-2">
        <Tooltip
          title={
            prop.dataType.detail && prop.dataType.detail.length === 0 ? (
              prop.dataType.type
            ) : (
              <ul>
                {prop.dataType.detail &&
                  prop.dataType.detail.map((item) => (
                    <li key={item.id}>- {item.value}</li>
                  ))}
              </ul>
            )
          }
          position="bottom"
        >
          <span className="text-white bg-primary px-2 py-1 rounded-full">
            {`${prop.value}${prop.optional ? "" : "?"}: ${prop.dataType.type}`}
          </span>
        </Tooltip>
      </div>
    </div>
  );
};

export default ItemFeatureComponent;
