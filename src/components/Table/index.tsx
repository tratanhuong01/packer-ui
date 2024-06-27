import { useContext, useEffect, useRef, useState } from "react";
import { ColumnsProps, TableProps } from "./type";
import "./index.scss";
import Pagination from "../Pagination";
import Button from "../Button";
import AutoComplete from "../AutoComplete";
import Input from "../Input";
import ModalFilters from "./ModalFilters";
import { TableContext, TableProvider } from "./TableContext";
import Select from "../Select";
import ModalCommon from "./ModalCommon";
import ModalWarningDelete from "./ModalWarningDelete";
import TableHeader from "./TableHeader";
import ColumnCustom from "./ColumnCustom";

const Table = <T, O>(props: TableProps<T, O>) => {
  return (
    <TableProvider>
      <TableContainer<T, O> {...props} />
    </TableProvider>
  );
};

const TableContainer = <T, O>({
  columns,
  callbackButton,
  handleCheck,
  hidden,
  commandBars,
  selectBars,
  filters,
  limit,
  getItems,
  ModalContainer,
  filterDefault,
  deleteMultiAPI,
}: TableProps<T, O>) => {
  //
  const {
    custom: {
      selected,
      list,
      showModalFilter,
      filterModal,
      idDelete,
      length,
      index,
      search,
      loading,
      warningDelete,
    },
    actions: { updateData },
    dispatch,
  } = useContext(TableContext);
  const [columnFilter, setColumnFilter] = useState(columns);
  const checked = (child?: any) => {
    if (selected.length === 0) return false;

    if (!child) return selected.length === list.length;
    const index = selected.findIndex((item) => item.id === child.id);
    return index !== -1;
  };
  const handleChange = (item: any) => {
    if (checked(item)) {
      dispatch(
        updateData(
          "selected",
          [...selected].filter((child) => child.id !== item.id)
        )
      );
      handleCheck &&
        handleCheck([...selected].filter((child) => child.id !== item.id));
      return;
    }
    dispatch(
      updateData(
        "selected",
        [...selected, item].map((item) => {
          return { ...item, delete: true };
        })
      )
    );
    handleCheck && handleCheck([...selected, item]);
  };
  const enableDelete =
    !hidden || hidden?.findIndex((item) => item === "delete") === -1;
  const enableEdit =
    !hidden || hidden?.findIndex((item) => item === "edit") === -1;
  const enableCheckbox =
    !hidden || hidden?.findIndex((item) => item === "checkbox") === -1;
  const ref = useRef<String>(search);
  const fetchData = async () => {
    dispatch(updateData("loading", true));
    if (!getItems) return;
    let temp = { ...filterModal };
    let keys = Object.keys(temp);
    let convert: { [key: string]: (string | number)[] } =
      { ...filterDefault } || {};
    for (let index = 0; index < keys.length; index++) {
      const element = keys[index];
      convert[element] = temp[element]?.map((item) => item.key);
    }
    const result = await getItems({
      offset: index,
      limit: limit || 0,
      filters: { ...convert },
      search: search.toLowerCase(),
    });
    dispatch(
      updateData("list", result.list.slice(0, limit || result.list.length))
    );
    dispatch(updateData("length", result.total));
    dispatch(updateData("loading", false));
  };
  useEffect(() => {
    if (search !== ref.current) {
      dispatch(updateData("index", 0));
    }
    ref.current = search;
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, search, filterModal]);
  //
  return (
    <div className={`w-full pt-3`.trim()}>
      {showModalFilter && <ModalFilters<T> filters={filters} />}
      <div className="flex justify-between items-center">
        {!hidden?.includes("search") && (
          <div className="flex items-center">
            <div className="w-80">
              <Input
                type="search"
                className="w-full"
                placeholder="Search..."
                debounce={{
                  handleStart() {
                    dispatch(updateData("loading", true));
                  },
                  handleCallback(val) {
                    dispatch(updateData("search", val));
                  },
                }}
              />
            </div>
            <Select
              options={columns.map((item) => {
                return {
                  key: item.field as string,
                  value: item.headerName,
                  checked: !item.hidden,
                };
              })}
              handleSelect={(key: string, status: boolean) => {
                setColumnFilter(
                  [...columnFilter].map((item) => {
                    if (item.field === key) item.hidden = !status;
                    return item;
                  })
                );
              }}
            />
          </div>
        )}
        {filters && (
          <Button
            mode="outlined"
            handleClick={() => dispatch(updateData("showModalFilter", true))}
            ping={Object.keys(filterModal).length > 0}
          >
            Filters
          </Button>
        )}
      </div>
      <div className="flex justify-between items-center py-5">
        <div className="flex items-center justify-end gap-4">
          {commandBars &&
            commandBars.map((item) => (
              <Button
                key={item.name}
                mode="outlined"
                icon={item.icon || ""}
                handleClick={() => {
                  if (!item.handle) return;
                  const result = item.handle();
                  if (result) {
                    dispatch(updateData("show", true));
                  }
                }}
                {...(item.props || {})}
              >
                {item.name}
              </Button>
            ))}
          <Button
            mode="outlined"
            icon="bx bx-trash"
            handleClick={() => dispatch(updateData("warningDelete", true))}
            disabled={selected.length === 0}
          >
            Delete
          </Button>
          {selectBars &&
            selectBars.map((item) => (
              <AutoComplete<O>
                key={Math.random()}
                options={item.options}
                defaultValue={item.defaultValue}
                nameSearch={item.nameSearch}
                customValue={(item: any) => item}
                itemHandle={(value: O) => item.handle && item.handle(value)}
              />
            ))}
        </div>
        <span className="text-gray-500 italic">
          {selected.length} of {!limit ? 0 : limit}
          {` selected`}
        </span>
      </div>
      <table
        className="w-full border border-solid border-gray-100"
        id="table_container"
      >
        <TableHeader
          checked={checked}
          columns={columnFilter}
          handleCheck={handleCheck}
          enableCheckbox={enableCheckbox}
          enableDelete={enableDelete}
          enableEdit={enableEdit}
        />
        <tbody className="relative">
          {list.map((item: any) => (
            <tr
              key={item.id}
              className={`relative border-b border-solid border-gray-200 ${
                idDelete?.toString() === item.id.toString() ? "not-bg" : ""
              } ${
                selected
                  .map((item) => item.id.toString())
                  .includes(item.id.toString())
                  ? "active"
                  : ""
              }`}
            >
              {enableCheckbox && (
                <td className="p-3 text-center">
                  <input
                    className="accent-primary"
                    onChange={() => handleChange(item)}
                    type="checkbox"
                    checked={checked(item)}
                  />
                </td>
              )}
              {columns
                .filter((item) => !item.hidden)
                .map((column: ColumnsProps<T>) => (
                  <ColumnCustom
                    key={Math.random()}
                    params={{
                      column,
                      value: item[column.field],
                      limit: limit || 0,
                      handleColumn: column.handle,
                      object: item,
                    }}
                  />
                ))}
              {enableEdit && (
                <td className="w-20 p-3 text-center">
                  <i
                    onClick={() => {
                      if (!callbackButton?.edit) return;
                      const result = callbackButton?.edit(item, () => "");
                      if (result) {
                        dispatch(updateData("idEdit", item.id));
                        dispatch(updateData("show", true));
                      }
                    }}
                    className="bx bx-edit text-yellow-500 text-xl cursor-pointer hover:bg-gray-100 w-10 h-10 
                      rounded-full flex items-center justify-center mx-auto"
                  ></i>
                </td>
              )}
              {enableDelete && (
                <td className="w-20 p-3 text-center">
                  <i
                    onClick={async () => {
                      dispatch(updateData("idDelete", item.id));
                      dispatch(updateData("loading", true));
                      callbackButton?.delete &&
                        (await callbackButton?.delete(item, () => {
                          if (list.length === 1) {
                            dispatch(
                              updateData("index", index - 1 < 0 ? 0 : index - 1)
                            );
                          }
                          dispatch(
                            updateData(
                              "list",
                              [...list].filter((item_) => item_.id !== item.id)
                            )
                          );
                          dispatch(
                            updateData(
                              "selected",
                              [...selected].filter(
                                (item_) => item_.id !== item.id
                              )
                            )
                          );
                          dispatch(updateData("length", length - 1));
                          dispatch(updateData("loading", false));
                        }));
                      await fetchData();
                    }}
                    className={`${
                      idDelete?.toString() === item.id.toString()
                        ? "bx bx-loader-alt animate-spin text-2xl cursor-not-allowed"
                        : "bx bx-trash-alt text-xl cursor-pointer"
                    } text-red-500 hover:bg-gray-100 w-10 h-10 
                    rounded-full flex items-center justify-center mx-auto`}
                  ></i>
                </td>
              )}
            </tr>
          ))}
          {loading && (
            <tr
              className="w-full flex items-center justify-center bg-white absolute top-0 left-0 right-0
             bottom-0 bg-opacity-50 py-32 not-bg-loading"
            >
              <td
                colSpan={
                  columns.filter((item) => !item.hidden).length +
                  3 +
                  (!enableDelete ? -1 : 0) +
                  (!enableEdit ? -1 : 0) +
                  (!enableCheckbox ? -1 : 0)
                }
                className="h-40 flex items-center justify-center"
              >
                <i className="bx bx-loader-alt text-3xl text-primary animate-spin" />
              </td>
            </tr>
          )}
          {!loading && list.length === 0 && (
            <tr
              className="w-full flex items-center justify-center bg-white mt-40 absolute top-0 left-0 right-0 
             bottom-0 bg-opacity-50"
            >
              <td
                colSpan={
                  columns.filter((item) => !item.hidden).length +
                  3 +
                  (!enableDelete ? -1 : 0) +
                  (!enableEdit ? -1 : 0) +
                  (!enableCheckbox ? -1 : 0)
                }
                className="loading-table"
              >
                <img
                  src="https://img.freepik.com/premium-vector/male-employee-is-looking-file-through-magnifying-glass-document_639720-48.jpg"
                  alt=""
                  className="w-60 h-60 object-cover mx-auto"
                />
                <p className="text-center text-sm text-gray-500">No result.</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {!limit ? (
        ""
      ) : (
        <div className="flex py-5 justify-center items-center">
          <Pagination
            current={index}
            length={length}
            limit={limit}
            handleItem={async (item) => {
              dispatch(updateData("index", item));
            }}
          />
        </div>
      )}
      <ModalCommon<T> ModalContainer={ModalContainer} limit={limit || 0} />
      {warningDelete && (
        <ModalWarningDelete
          closeModal={() => {
            dispatch(updateData("warningDelete", false));
          }}
          deleteAPI={deleteMultiAPI}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default Table;
