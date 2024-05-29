import { ChangeEvent, useContext, useEffect, useState } from "react";
import Modal from "../../Modal";
import { FilterItemProps, OptionFilerProps, ObjectCustom } from "../type";
import { TableContext } from "../TableContext";

const ItemFilter = <T,>({
  item,
  filterValue,
  setFilterValue,
}: {
  item: FilterItemProps<T>;
  setFilterValue: Function;
  filterValue: ObjectCustom;
}) => {
  //
  const [show, setShow] = useState(true);
  const attr = item.field as string;
  const [checked, setChecked] = useState<OptionFilerProps[]>(
    filterValue[attr] || []
  );
  useEffect(() => {
    if (checked.length === 0) {
      delete filterValue[item.name];
    } else {
      setFilterValue({
        ...filterValue,
        [item.field]: checked,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);
  //
  return (
    <div>
      <div
        onClick={() => setShow(!show)}
        className="flex items-center gap-3 cursor-pointer"
      >
        <i className={`bx bx-chevron-${show ? "down" : "up"} text-2xl`}></i>
        <span className="font-semibold">{item.name}</span>
        {checked.length !== 0 && (
          <div className="flex items-center gap-3">
            <div className="px-2 py-1 relative bg-primary text-white text-sm rounded-sm">
              <span>{checked.length}</span>
              <span> selected</span>
            </div>
          </div>
        )}
      </div>
      {show && (
        <div className="flex flex-col gap-2 mt-2 pl-3">
          {item.options.map((item) => {
            const index = checked.findIndex((chx) => chx.key === item.key);
            return (
              <label
                htmlFor={`checkbox_${item.value
                  .toLowerCase()
                  .replace(" ", "_")}`}
                className="flex items-center gap-3"
                key={item.value}
              >
                <input
                  checked={index !== -1}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    e.target.checked
                      ? setChecked([...checked, item])
                      : setChecked(
                          [...checked].filter((chx) => chx.key !== item.key)
                        )
                  }
                  id={`checkbox_${item.value.toLowerCase().replace(" ", "_")}`}
                  type="checkbox"
                  className="accent-primary"
                />
                <span className="text-gray-700">{item.value}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};

const ModalFilters = <T,>({ filters }: { filters?: FilterItemProps<T>[] }) => {
  //
  const {
    custom: { filterModal },
    actions: { updateData },
    dispatch,
  } = useContext(TableContext);
  const [filterValue, setFilterValue] = useState<ObjectCustom>(filterModal);
  const [loading, setLoading] = useState(false);
  //
  return (
    <Modal
      closeModal={() => dispatch(updateData("showModalFilter", false))}
      mode="panel"
      headerTitle="Filters"
      submitForm={(e: any) => e.preventDefault()}
      footerButton={[
        {
          name: "Cancel",
          type: "other",
          handle: () => dispatch(updateData("showModalFilter", false)),
          id: 1,
        },
        {
          name: "Save",
          type: "confirm",
          handle: async () => {
            setLoading(true);

            dispatch(updateData("filterModal", { ...filterValue }));
            dispatch(updateData("showModalFilter", false));
          },
          id: Math.random(),
        },
      ]}
      loading={loading}
    >
      <div className="flex flex-col gap-3">
        {filters?.map((item) => (
          <ItemFilter
            key={item.field.toString()}
            item={item}
            filterValue={filterValue}
            setFilterValue={setFilterValue}
          />
        ))}
      </div>
    </Modal>
  );
};

export default ModalFilters;
