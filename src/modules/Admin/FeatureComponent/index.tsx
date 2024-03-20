import { useContext, useEffect, useRef } from "react";
import Button from "../../../components/Button";
import { AdminContext } from "../../../contexts/AdminContext/AdminContext";
import ItemFeatureComponent from "./ItemFeatureComponent";

const FeatureComponent = () => {
  const {
    admin: {
      props: { done, component },
    },
    dispatch,
    actions: { updateProps },
  } = useContext(AdminContext);
  const refScroll = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (refScroll.current) {
      refScroll.current.scrollTop = refScroll.current.scrollHeight + 100;
    }
  }, [component]);
  return (
    <div className="w-1/3 mx-auto">
      <div className="my-5 flex items-center gap-1 ">
        {[...done].map((prop) => (
          <span
            key={prop.id}
            className="text-white bg-blue-500 px-2 py-1 rounded-full"
          >
            {`${prop.value}${prop.optional ? "" : "?"}: ${prop.dataType.type}`}
          </span>
        ))}
      </div>
      <div
        ref={refScroll}
        className="flex flex-wrap items-start min-h-16 overflow-y-scroll scroll-smooth"
        style={{ height: component.length === 0 ? "auto" : 300 }}
      >
        {component.map((prop) => (
          <ItemFeatureComponent key={prop.id} prop={prop} />
        ))}
        {component.length === 0 && done.length === 0 && (
          <p className="h-16 text-center text-gray-500 w-full">
            Not prop data.
          </p>
        )}
      </div>
      <Button
        className="mt-4"
        handleClick={() => {
          dispatch(
            updateProps("component", [
              ...component,
              {
                id: Math.random(),
                dataType: {
                  type: "",
                  detail: [],
                },
                value: "Props" + (component.length + 1),
                optional: false,
              },
            ])
          );
        }}
        type="button"
        mode="outlined"
      >
        Add prop
      </Button>
    </div>
  );
};

export default FeatureComponent;
