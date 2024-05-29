import { useState } from "react";
import TransferListType from "./type";
import ItemTransferList from "./ItemTransferList";

const TransferList = ({ items }: TransferListType) => {
  //
  const [current, setCurrent] = useState<any[]>(
    [...items].map((item, index) => {
      return { ...item, checked: false, index };
    })
  );
  const [selected, setSelected] = useState<any[]>([]);
  const handleChecked = (item: any, isLeft: boolean) => {
    const newData = isLeft ? [...current] : [...selected];
    const index = newData.findIndex((_) => _.id === item.id);
    if (index !== -1) {
      newData[index].checked = !newData[index].checked;
      isLeft ? setCurrent([...newData]) : setSelected([...newData]);
    }
    return;
  };
  const handleClick = (isLeft: boolean) => {
    if (isLeft) {
      const filterLeft = [...selected]
        .filter((item) => item.checked)
        .map((item) => {
          return { ...item, checked: false };
        });
      if (filterLeft.length === 0) return;
      setSelected([...selected].filter((item) => !item.checked));
      setCurrent([...current, ...filterLeft]);
    } else {
      const filterRight = [...current]
        .filter((item) => item.checked)
        .map((item) => {
          return { ...item, checked: false };
        });
      if (filterRight.length === 0) return;
      setCurrent([...current].filter((item) => !item.checked));
      setSelected([...selected, ...filterRight]);
    }
  };
  //
  return (
    <div style={{ width: 800 }} className="flex gap-4">
      <div
        className={`w-2/5 ${
          current.length === 0 ? "flex items-center justify-center" : ""
        } bg-gray-100 p-4`}
      >
        <ItemTransferList
          items={current.sort((a, b) => a.index - b.index)}
          handleChecked={handleChecked}
          type="left"
        />
      </div>
      <div className="w-1/5 flex items-center justify-center">
        <ul className="flex flex-col gap-4">
          <li
            onClick={() => {
              setSelected(
                [...items].map((item, index) => {
                  return { ...item, checked: false, index };
                })
              );
              setCurrent([]);
            }}
            className={`${
              current.length === 0
                ? "opacity-80 cursor-not-allowed cursor-pointer text-gray-500 border-gray-300"
                : "text-primary border-primary cursor-pointer"
            } bx bx-chevrons-right w-16 h-10 flex items-center 
            justify-center border border-solid`}
          ></li>
          <li
            onClick={() => handleClick(false)}
            className={`${
              current.filter((item) => item.checked).length === 0
                ? "opacity-80 cursor-not-allowed cursor-pointer text-gray-500 border-gray-300"
                : "text-primary border-primary cursor-pointer"
            } bx bx-chevron-right w-16 h-10 flex items-center 
            justify-center border border-solid`}
          ></li>
          <li
            onClick={() => handleClick(true)}
            className={`${
              selected.filter((item) => item.checked).length === 0
                ? "opacity-80 cursor-not-allowed cursor-pointer text-gray-500 border-gray-300"
                : "text-primary border-primary cursor-pointer"
            } bx bx-chevron-left w-16 h-10 flex items-center 
          justify-center border border-solid`}
          ></li>
          <li
            onClick={() => {
              setCurrent(
                [...items].map((item, index) => {
                  return { ...item, checked: false, index };
                })
              );
              setSelected([]);
            }}
            className={`${
              selected.length === 0
                ? "opacity-80 cursor-not-allowed cursor-pointer text-gray-500 border-gray-300"
                : "text-primary border-primary cursor-pointer"
            } bx bx-chevrons-left w-16 h-10 flex items-center 
            justify-center border border-solid`}
          ></li>
        </ul>
      </div>
      <div
        className={`w-2/5 ${
          selected.length === 0 ? "flex items-center justify-center" : ""
        } bg-gray-100 p-4`}
      >
        <ItemTransferList
          items={selected.sort((a, b) => a.index - b.index)}
          handleChecked={handleChecked}
          type="right"
        />
      </div>
    </div>
  );
};

export default TransferList;
