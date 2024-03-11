import { useState } from "react";
import TableProps from "./type";

const Table = ({ thead, tbody }: TableProps) => {
  //
  const [list, setList] = useState<any[]>(tbody);
  const [selected, setSelected] = useState<any[]>([]);
  const checked = (child?: any) => {
    if (!child) return selected.length === list.length;
    const index = selected.findIndex((item) => item.id === child.id);
    return index !== -1;
  };
  const handleChange = (item: any) => {
    if (checked(item)) {
      setSelected([...selected].filter((child) => child.id !== item.id));
      return;
    }
    setSelected([...selected, item]);
  };
  //
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="p-2 text-center">
            <input
              onChange={() => {
                if (selected.length === list.length) {
                  setSelected([]);
                } else {
                  setSelected([...tbody]);
                }
              }}
              checked={checked()}
              type="checkbox"
            />
          </th>
          {thead.map((item) => (
            <th className="p-2" key={item}>
              {item}
            </th>
          ))}
        </tr>
      </thead>
      {tbody.length > 0 && (
        <tbody>
          {list.map((item) => (
            <tr>
              <td className="p-2 text-center">
                <input
                  onChange={() => handleChange(item)}
                  type="checkbox"
                  checked={checked(item)}
                />
              </td>
              {Object.keys(item).map((child: any) => (
                <td className="p-2 text-center" key={item[child]}>
                  {item[child]}
                </td>
              ))}
              <td className="p-2 text-center">
                <i
                  className="bx bx-edit text-yellow-500 text-xl cursor-pointer hover:bg-gray-100 w-10 h-10 
              rounded-full flex items-center justify-center mx-auto"
                ></i>
              </td>
              <td className="p-2 text-center">
                <i
                  onClick={() => {
                    setList([...list].filter((item_) => item_.id !== item.id));
                    setSelected(
                      [...selected].filter((item_) => item_.id !== item.id)
                    );
                  }}
                  className="bx bx-trash text-red-500 text-xl cursor-pointer hover:bg-gray-100 w-10 h-10 
              rounded-full flex items-center justify-center mx-auto"
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
};

export default Table;
