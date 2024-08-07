/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import Header from "../modules/UI Components/components/Header";
import Parent from "../components/Parent";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext/AppContext";
import LeftNavigation from "../modules/UI Components/components/LeftNavigation";
import GenerateRoute from "../routers/GenerateRoute";
import { routeFull } from "../utils/utils";
import NotFound from "../modules/UI Components/components/NotFound";

type WrapperProps = {
  children?: ReactNode;
  notFound?: boolean;
  hideContentRight?: boolean;
};

const Wrapper = ({ children, notFound, hideContentRight }: WrapperProps) => {
  //
  const {
    dispatch,
    actions: { updateData },
  } = useContext(AppContext);
  // const [loading, setLoading] = useState(true);
  const refContent = useRef<HTMLDivElement>(null);
  const [component, setComponent] = useState<any>();
  const location = useLocation();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [componentList, setComponentList] = useState<any>();
  useEffect(() => {
    if (!refContent.current) return;
    refContent.current.scrollTop = 0;
    dispatch(updateData({ key: "menuActive", value: false }));
    if (location.pathname === "/") {
      navigate("/getting-started/overview");
      return;
    }
    let checkIndex = -1;
    GenerateRoute.forEach((item: any) => {
      if (!Array.isArray(item.items)) return;
      const check = item.items.findIndex(
        (child: any) =>
          location.pathname === `${routeFull(item.name, child.name)}`
      );
      if (check !== -1) {
        checkIndex = check;
        setComponent(item.items[check]);
        return;
      }
    });
    if (checkIndex === -1)
      setComponent({ component: <NotFound />, isFull: true });
    //
  }, [location.pathname, componentList]);
  return (
    <div className="w-full overflow-hidden flex flex-col h-screen">
      <Header />
      <Parent
        gap={10}
        className="flex-1 relative h-full overflow-y-hidden flex flex-row"
      >
        <LeftNavigation componentList={componentList} />
        <div ref={refContent} className="flex-1 relative h-full flex flex-row">
          <div className="flex-1 p-2 h-full overflow-y-scroll">
            {component?.component}
          </div>
          {/* {!component?.isFull && <div className="w-60"></div>} */}
          <div id="children-modal-root"></div>
        </div>
      </Parent>
    </div>
  );
};

export default Wrapper;
