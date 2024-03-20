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
import RenderComponent from "../modules/UI Components/components/RenderComponent";

const Wrapper = ({
  children,
  notFound,
}: {
  children?: ReactNode;
  notFound?: boolean;
}) => {
  //
  const {
    dispatch,
    actions: { updateData },
  } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const refContent = useRef<HTMLDivElement>(null);
  const [component, setComponent] = useState<any>();
  const location = useLocation();
  const navigate = useNavigate();
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
    const newData = [
      ...GenerateRoute,
      { id: Math.random(), name: "Components", items: componentList },
    ];
    newData.forEach((item: any) => {
      const check = item.items.findIndex(
        (child: any) =>
          location.pathname === `${routeFull(item.name, child.name)}`
      );
      if (check !== -1) {
        checkIndex = check;
        setComponent(item.items[check].component);

        return;
      }
    });
    if (checkIndex === -1) setComponent(<NotFound />);
    //
  }, [location.pathname, componentList]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("http://192.168.30.163:8000/components").then(
        (res) => res.json()
      );
      setComponentList(result);
      setLoading(false);
    };
    fetchData();
  }, []);
  //
  return (
    <div className="h-screen w-full overflow-hidden flex flex-col">
      <Header />
      <Parent gap={10} className="flex-1 overflow-hidden">
        {loading ? (
          <div className="h-full w-full flex items-center justify-center">
            <i className="bx bx-loader-alt text-4xl animate-spin"></i>
          </div>
        ) : (
          <>
            <LeftNavigation componentList={componentList} />
            <div
              ref={refContent}
              className="flex-1 px-4 pt-2 overflow-y-scroll h-full relative"
            >
              {notFound ? (
                children
              ) : component && component.length ? (
                // <div className="w-2/3">
                <RenderComponent data={component} />
              ) : (
                // </div>
                component
              )}
              <div id="children-modal-root"></div>
            </div>
          </>
        )}
      </Parent>
    </div>
  );
};

export default Wrapper;
