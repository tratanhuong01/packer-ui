import { ReactNode, memo, useContext, useEffect, useState } from "react";
import AutoComplete from "../../components/AutoComplete";
import { AdminContext } from "../../contexts/AdminContext/AdminContext";
import { getAllComponents } from "./apis";

const ContentPropPage = ({
  itemHandle,
  children,
  selected,
  setSelected,
}: {
  selected: any[];
  itemHandle: Function;
  children: ReactNode;
  setSelected: Function;
}) => {
  //
  const {
    admin: {
      props: { component },
    },
  } = useContext(AdminContext);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<any[]>();
  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllComponents().then((res) => res.json());
      setOptions(result);
    };
    fetchData();
  }, []);
  //
  return options ? (
    <div className="w-full h-full flex-col flex">
      <div className="pt-5 pb-5">
        <AutoComplete
          options={options}
          disabled={component === null ? true : false}
          itemHandle={async (item: any) => {
            setSelected(item);
            setLoading(true);
            await itemHandle(item);
            setLoading(false);
          }}
          nameSearch="name"
          customValue={(value: any) => value}
        />
      </div>
      {selected && (
        <div className="flex-1">
          {!loading ? (
            children
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <i className="bx bx-loader-alt text-5xl animate-spin text-primary" />
            </div>
          )}
        </div>
      )}
    </div>
  ) : (
    <div className="w-full h-full flex items-center justify-center">
      <i className="bx bx-loader-alt text-5xl animate-spin text-primary -mt-10 ml-5" />
    </div>
  );
};
export default memo(ContentPropPage);
