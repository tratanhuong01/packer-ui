/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Parent from "../components/Parent";
import { useLocation } from "react-router-dom";
import { AppContext } from "../contexts/AppContext/AppContext";
import LeftNavigation from "../modules/UI Components/components/LeftNavigation";
import GenerateRoute from "../routers/GenerateRoute";
import { routeFull } from "../utils/utils";

const Wrapper = ({ children }: { children?: ReactNode }) => {
  //
  const {
    dispatch,
    actions: { updateData },
  } = useContext(AppContext);

  const refContent = useRef<HTMLDivElement>(null);
  const [component, setComponent] = useState<ReactNode>();
  let location = useLocation();

  useEffect(() => {
    if (!refContent.current) return;
    refContent.current.scrollTop = 0;
    dispatch(updateData({ key: "menuActive", value: false }));
    GenerateRoute.forEach((item) => {
      let check = item.items.findIndex(
        (child) => location.pathname === `${routeFull(item.name, child.name)}`
      );
      if (check !== -1) {
        setComponent(item.items[check].component);
      }
    });
    //
  }, [location.pathname]);
  //
  return (
    <div className="h-screen w-full overflow-hidden flex flex-col">
      <Header />
      <Parent gap={10} className="flex-1 overflow-hidden">
        <LeftNavigation />
        <div
          ref={refContent}
          className="flex-1 px-4 pt-2 overflow-y-scroll h-full"
        >
          {component && component}
        </div>
      </Parent>
    </div>
  );
};

export default Wrapper;
