/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useContext, useEffect, useRef } from "react";
import Header from "../components/Header";
import Parent from "../components/Parent";
import LeftNavigation from "../components/LeftNavigation";
import { useLocation } from "react-router-dom";
import { AppContext } from "../contexts/AppContext/AppContext";

const Wrapper = (props: { children: ReactNode }) => {
  //
  const {
    dispatch,
    actions: { updateData },
  } = useContext(AppContext);
  const refContent = useRef<HTMLDivElement>(null);
  let location = useLocation();
  useEffect(() => {
    if (!refContent.current) return;
    refContent.current.scrollTop = 0;
    dispatch(updateData({ key: "menuActive", value: false }));
  }, [location]);
  //
  return (
    <div className="h-screen w-full overflow-hidden flex flex-col">
      <Header />
      <Parent gap={10} className="flex-1 overflow-hidden">
        <LeftNavigation />
        <div
          ref={refContent}
          className="flex-1 px-4 pt-2 pb-80 overflow-y-scroll h-full"
        >
          {props.children}
        </div>
      </Parent>
    </div>
  );
};

export default Wrapper;
