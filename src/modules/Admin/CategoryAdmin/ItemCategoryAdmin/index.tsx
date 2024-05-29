import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ItemCategoryAdmin = () => {
  //
  const [show, setShow] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname.replace("/admin/component/", "");
  //
  return (
    <div>
      <div
        onClick={() => setShow(!show)}
        className="bg-primary p-2 text-white font-bold rounded-lg cursor-pointer 
      transition-colors flex justify-between items-center"
      >
        Component <i className={`bx bx-chevron-${show ? "down" : "up"}`}></i>
      </div>
      {show && (
        <ul className="pt-2">
          <li
            onClick={() => navigate("/admin/component/dashboard")}
            className={`p-2 font-bold rounded-lg cursor-pointer ${
              pathname === "dashboard" ? "" : "hover:"
            }text-primary 
            transition-colors flex items-center gap-2`}
          >
            <i className="bx bx-chevron-right"></i> Dashboard
          </li>
          <li
            onClick={() => navigate("/admin/component/add-props")}
            className={`p-2 font-bold rounded-lg cursor-pointer ${
              pathname === "add-props" ? "" : "hover:"
            }text-primary 
            transition-colors flex items-center gap-2`}
          >
            <i className="bx bx-chevron-right"></i> Add props
          </li>
          <li
            onClick={() => navigate("/admin/component/add-content")}
            className={`p-2 font-bold rounded-lg cursor-pointer ${
              pathname === "add-content" ? "" : "hover:"
            }text-primary 
            transition-colors flex items-center gap-2`}
          >
            <i className="bx bx-chevron-right"></i> Add content
          </li>
        </ul>
      )}
    </div>
  );
};

export default ItemCategoryAdmin;
