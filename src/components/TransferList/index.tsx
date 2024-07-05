import { useEffect, useState } from "react";
import TransferListType from "./type";
import ItemTransferList from "./ItemTransferList";
import Loading from "../Loading";

const getProducts = async () => {
  const result = await fetch(
    `https://657bd1e1394ca9e4af14cfed.mockapi.io/api/v1/products`
  ).then((res) => res.json());
  return result?.map((item: any) => ({
    key: item.id,
    value: item.name,
  }));
};

const TransferList = ({ height }: TransferListType) => {
  //
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getProducts();
      setItems(result);
      setLoading(false);
    };
    fetchData();
  }, []);
  useEffect(() => {
    setCurrent(
      [...items].map((item, index) => {
        return { ...item, checked: false, index };
      })
    );
  }, [items]);
  const [current, setCurrent] = useState<any[]>([]);
  const [selected, setSelected] = useState<any[]>([]);
  const handleChecked = (item: any, isLeft: boolean) => {
    const newData = isLeft ? [...current] : [...selected];
    console.log(newData);
    const index = newData.findIndex((_) => _.key === item.key);
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
    <div
      className="flex gap-4 overflow-hidden"
      style={{ height: height || 420 }}
    >
      <div
        className={`w-2/5 ${
          current.length === 0 ? "flex items-center justify-center" : ""
        } bg-gray-100 p-4 overflow-y-${
          loading ? "hidden" : "scroll"
        } rounded-lg relative`}
      >
        <ItemTransferList
          items={current.sort((a, b) => a.index - b.index)}
          handleChecked={handleChecked}
          type="left"
        />
        {loading && <Loading container overlay />}
      </div>
      <div className="w-1/5 flex items-center justify-center h-full">
        <ul className="flex flex-col gap-4">
          <li
            onClick={() => {
              !loading &&
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
            onClick={() => !loading && handleClick(false)}
            className={`${
              current.filter((item) => item.checked).length === 0
                ? "opacity-80 cursor-not-allowed cursor-pointer text-gray-500 border-gray-300"
                : "text-primary border-primary cursor-pointer"
            } bx bx-chevron-right w-16 h-10 flex items-center 
            justify-center border border-solid`}
          ></li>
          <li
            onClick={() => !loading && handleClick(true)}
            className={`${
              selected.filter((item) => item.checked).length === 0
                ? "opacity-80 cursor-not-allowed cursor-pointer text-gray-500 border-gray-300"
                : "text-primary border-primary cursor-pointer"
            } bx bx-chevron-left w-16 h-10 flex items-center 
          justify-center border border-solid`}
          ></li>
          <li
            onClick={() => {
              if (loading) return;
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
        } bg-gray-100 p-4 overflow-y-${
          loading ? "hidden" : "scroll"
        } rounded-lg relative`}
      >
        <ItemTransferList
          items={selected.sort((a, b) => a.index - b.index)}
          handleChecked={handleChecked}
          type="right"
        />
        {loading && <Loading container overlay />}
      </div>
    </div>
  );
};

export default TransferList;
