import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ItemGenerateRoute } from "../../../../../routers/GenerateRoute/type";
import { routeFull } from "../../../../../utils/utils";

const ItemLeftNavigation = ({
  navigation,
  parent,
}: {
  navigation: ItemGenerateRoute;
  parent: string;
}) => {
  //
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
        Array.isArray(navigation.items) &&
        navigation.items
          .sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
          .map((item) => (
            <div
              onClick={() => navigate(routeFull(parent, item.name))}
              key={item.id}
              className="flex gap-3 hover:bg-gray-100 cursor-pointer"
            >
              <div className="py-1 w-0.5 mx-2 bg-gray-200"></div>
              <div className="py-1 hover:text-primary text-gray-500 font-semibold">
                {item.name}
              </div>
            </div>
          ))}
    </div>
  );
};

export default ItemLeftNavigation;
