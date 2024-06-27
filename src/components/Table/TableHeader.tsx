import { useContext } from "react";
import { ColumnsProps } from "./type";
import { TableContext } from "./TableContext";

type TableHeaderProps<T> = {
  enableCheckbox?: boolean;
  handleCheck: Function | undefined;
  checked: Function;
  columns: ColumnsProps<T>[];
  enableDelete?: boolean;
  enableEdit?: boolean;
};

const TableHeader = <T,>({
  enableCheckbox,
  enableEdit,
  enableDelete,
  handleCheck,
  checked,
  columns,
}: TableHeaderProps<T>) => {
  //
  const {
    custom: { selected, list },
    dispatch,
    actions: { updateData },
  } = useContext(TableContext);
  //
  return (
    <thead>
      <tr className="bg-gray-100 hover:bg-gray-200 hover:bg-opacity-70 bg-opacity-60 border border-solid border-gray-100 relative">
        {enableCheckbox && (
          <th className="w-16 p-3 text-center border-r border-solid border-white active:bg-gray-300">
            <input
              onChange={() => {
                if (selected.length === list.length) {
                  dispatch(updateData("selected", []));
                  handleCheck && handleCheck([]);
                } else {
                  dispatch(updateData("selected", [...list]));
                  handleCheck && handleCheck([...list]);
                }
              }}
              className="accent-primary"
              checked={checked()}
              type="checkbox"
            />
          </th>
        )}
        {columns
          .filter((item) => !item.hidden)
          .map((item: ColumnsProps<T>) => (
            <th
              className="p-2 font-semibold text-gray-700"
              key={item.headerName}
            >
              {item.headerName}
            </th>
          ))}
        {enableEdit && (
          <th className="border-solid border-white active:bg-gray-300">Edit</th>
        )}
        {enableDelete && (
          <th className="border-l border-solid border-white active:bg-gray-300">
            Delete
          </th>
        )}
      </tr>
    </thead>
  );
};

export default TableHeader;
