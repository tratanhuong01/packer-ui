import { useState } from "react";
import { NavigationProps } from "../navigation";
import { useNavigate } from "react-router-dom";

const ItemLeftNavigation = (props: { navigation: NavigationProps }) => {
  //
  const { navigation } = props;
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  //
  return (
    <div>
      <div
        onClick={() => setShow(!show)}
        className="flex cursor-pointer gap-3 py-1 items-center"
      >
        <div className="w-5 text-left text-xl">
          <i className={`bx bx-chevron-${show ? "down" : "up"}`} />
        </div>
        <div className="font-semibold">{navigation.name}</div>
      </div>
      {show &&
        navigation.items.map((item) => (
          <div
            onClick={() =>
              navigate(
                `/component/${item.name.toLowerCase().split(" ").join("-")}`
              )
            }
            key={item.id}
            className="flex gap-3 hover:bg-gray-100 cursor-pointer"
          >
            <div className="py-1 w-0.5 mx-2 bg-gray-200"></div>
            <div className="py-1 hover:text-blue-500 text-gray-500 font-semibold">
              {item.name}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ItemLeftNavigation;
