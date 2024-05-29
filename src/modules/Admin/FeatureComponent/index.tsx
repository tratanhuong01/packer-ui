import { useContext, useEffect, useRef } from "react";
import Button from "../../../components/Button";
import { AdminContext } from "../../../contexts/AdminContext/AdminContext";
import ItemFeatureComponent from "./ItemFeatureComponent";

const FeatureComponent = ({ selected }: { selected: any }) => {
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
    <div className="w-full">
      <div
        ref={refScroll}
        className="flex flex-wrap items-start mt-5 min-h-16 overflow-y-scroll scroll-smooth"
        style={{ height: component.length === 0 ? "auto" : 380 }}
      >
        {component.map((prop) => (
          <ItemFeatureComponent key={prop.id} prop={prop} selected={selected} />
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
                isAdded: true,
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
