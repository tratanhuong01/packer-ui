import "./index.scss";
import Box from "../Box";
import Parent from "../Parent";
import Popover from "../Popover";
import Tooltip from "../Tooltip";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext/AppContext";

const Header = () => {
  //
  const {
    actions: { updateData },
    dispatch,
  } = useContext(AppContext);
  const listButton = [
    {
      id: Math.random(),
      icon: "bx bxl-github",
      hover: "Github repository",
    },
    {
      id: Math.random(),
      icon: "bx bx-bell",
      hover: "Toggle notifications panel",
    },
    {
      id: Math.random(),
      icon: "bx bx-cog",
      hover: "Toggle setting drawer",
    },
  ];
  //
  return (
    <header className="header px-4 py-2 flex justify-between border-b border-solid border-gray-200">
      <Parent items="center" gap={15}>
        <Parent items="center" gap={10}>
          <i className="bx bxl-meta text-blue-500 text-4xl"></i>
          <span
            className="font-bold hidden sm:block text-sm text-gray-400"
            style={{ fontFamily: "sans-serif" }}
          >
            PACKER UI
          </span>
        </Parent>
        <Popover
          component={
            <ul>
              <li className="p-1.5 border-solid border-b border-gray-200">
                User 1
              </li>
              <li className="p-1.5 border-solid border-b border-gray-200">
                User 2
              </li>
            </ul>
          }
        >
          <div
            className="bg-gray-100 rounded-2xl text-gray-500 text-sm w-auto inline-block px-3 py-1.5 border 
            border-solid border gray-300 cursor-pointer relative"
          >
            <span>User 1</span>
            <span className="bx bx-chevron-down"></span>
          </div>
        </Popover>
      </Parent>

      <Parent gap={10}>
        <ul className="items-center font-semibold gap-5 hidden md:flex">
          <li className="cursor-pointer hover:text-blue-500 text-gray-600">
            Docs
          </li>
          <li className="cursor-pointer hover:text-blue-500 text-gray-600">
            Components
          </li>
          <li className="cursor-pointer hover:text-blue-500 text-gray-600">
            Blog
          </li>
          <li className="cursor-pointer hover:text-blue-500 text-gray-600">
            Show case
          </li>
        </ul>
        <Parent gap={10}>
          <div className="block md:hidden">
            <Tooltip title={"Menu"} position="bottom">
              <Box
                handleClick={() =>
                  dispatch(
                    updateData({
                      key: "menuActive",
                      value: true,
                    })
                  )
                }
                width={40}
                height={40}
                border="border-gray-200 border-solid border"
                className={`rounded-xl text-2xl text-blue-500 hover:bg-blue-100 cursor-pointer`}
              >
                <i className="bx bx-menu"></i>
              </Box>
            </Tooltip>
          </div>
          {listButton.map((item) => (
            <Tooltip key={item.id} title={item.hover} position="bottom">
              <Box
                key={item.id}
                width={40}
                height={40}
                border="border-gray-200 border-solid border"
                className={`rounded-xl text-2xl text-blue-500 hover:bg-blue-100 cursor-pointer`}
              >
                <i className={item.icon}></i>
              </Box>
            </Tooltip>
          ))}
        </Parent>
      </Parent>
    </header>
  );
};

export default Header;
