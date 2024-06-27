import { useContext } from "react";
import { ColumnsProps, Model } from "./type";
import { TableContext } from "./TableContext";

type ColumnCustomProps<T> = {
  column: ColumnsProps<T>;
  value: any;
  object: Model<T>;
  limit: number;
  handleColumn?: Function;
};

const ColumnCustom = <T,>({
  params: { column, value, object, handleColumn },
}: {
  params: ColumnCustomProps<T>;
}) => {
  //
  const Custom = column.customColumn;
  const {
    custom: { list },
    actions: { updateData },
    dispatch,
  } = useContext(TableContext);
  const index = list.findIndex((item) => object.id === item.id);
  const handleChangeIndex = async (isTop: boolean) => {
    if (!handleColumn) return;

    dispatch(updateData("loading", true));
    const indexCheck = list.findIndex((item) => object.id === item.id);
    let temp = [...list];
    const indexTemp = temp[indexCheck];
    const indexCopy = temp[isTop ? indexCheck - 1 : indexCheck + 1];
    temp[indexCheck] = { ...indexCopy, index: indexTemp.index };
    temp[isTop ? indexCheck - 1 : indexCheck + 1] = {
      ...indexTemp,
      index: indexCopy.index,
    };
    await handleColumn({
      copy: temp[indexCheck],
      temp: temp[isTop ? indexCheck - 1 : indexCheck + 1],
    });
    dispatch(updateData("list", [...temp]));
    dispatch(updateData("loading", false));
  };
  //
  return (
    <td className={`p-2 text-${column.align || "center"}`} key={Math.random()}>
      {column.customColumn ? (
        <Custom item={value} object={object} />
      ) : column.field === "index" && handleColumn ? (
        <div className="flex items-center gap-3 text-gray-600 justify-center">
          {Boolean(index) && (
            <span
              onClick={() => handleChangeIndex(true)}
              className="bx bx-arrow-to-top text-2xl"
            ></span>
          )}
          {index < list.length - 1 && (
            <span
              onClick={() => handleChangeIndex(false)}
              className="bx bx-arrow-to-bottom text-2xl"
            ></span>
          )}
        </div>
      ) : (
        `${value || ""}`.slice(0, 150)
      )}
    </td>
  );
};

export default ColumnCustom;
