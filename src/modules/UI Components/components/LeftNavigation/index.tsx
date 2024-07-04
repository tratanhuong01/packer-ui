/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import ItemLeftNavigation from "./ItemLeftNavigation";
import { AppContext } from "../../../../contexts/AppContext/AppContext";
import ModalSearch from "../../../../modals/ModalSearch";
import Input from "../../../../components/Input";
import Box from "../../../../components/Box";
import GenerateRoute from "../../../../routers/GenerateRoute";
import { ItemGenerateChild } from "../../../../routers/GenerateRoute/type";
//

const LeftNavigation = ({
  componentList,
}: {
  componentList: ItemGenerateChild[];
}) => {
  //
  const {
    app: { menuActive },
    actions: { updateData },
    dispatch,
  } = useContext(AppContext);
  const [show, setShow] = useState(false);
  const onResize = () => {
    dispatch(
      updateData({
        key: "menuActive",
        value: window.innerWidth >= 1024,
      })
    );
  };
  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [menuActive]);
  //
  return (
    <div
      className={`w-full z-0 lg:w-60 fixed lg:static top-0 left-0 bg-opacity-50 bg-black lg:bg-opacity-100 lg:bg-transparent 
      h-screen lg:h-full overflow-y-hidden ${
        menuActive ? "block" : "hidden lg:block"
      }`}
    >
      {show && (
        <ModalSearch
          headerTitle="Search"
          footerButton={[
            {
              id: Math.random(),
              name: "Close",
              type: "confirm",
              handle: () => {},
            },
          ]}
          closeModal={() => setShow(false)}
        />
      )}
      <div className="w-11/12 lg:w-full h-full bg-white p-3 lg:px-3 lg:py-0 overflow-y-scroll relative">
        <Input
          handleClick={() => setShow(true)}
          type="search"
          className="hidden lg:block w-full pt-5"
          placeholder="Search..."
        />
        <Box
          handleClick={() =>
            dispatch(
              updateData({
                key: "menuActive",
                value: false,
              })
            )
          }
          width={40}
          height={40}
          className="flex lg:hidden absolute top-3 right-3 cursor-pointer"
          rounded
          border="border border-solid border-gray-200"
        >
          <i className="bx bx-x text-xl text-gray-500"></i>
        </Box>
        <div className="mt-4"></div>
        {GenerateRoute.map((item) => (
          <ItemLeftNavigation
            key={item.id}
            navigation={item}
            parent={item.name}
          />
        ))}
      </div>
    </div>
  );
};

export default LeftNavigation;
