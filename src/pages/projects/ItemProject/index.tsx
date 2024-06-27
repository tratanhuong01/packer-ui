import { useState } from "react";
import Button from "../../../components/Button";
import Preview from "../Preview";

const ItemProject = () => {
  //
  const [show, setShow] = useState(false);
  //
  return (
    <div>
      <div className="pt-60 relative">
        <div className="absolute top-0 right-0 bottom-0 left-0">
          <img
            src="https://colorlib.com/wp/wp-content/uploads/sites/2/homes-free-template-408x322.jpg"
            alt=""
            className="w-full h-full cursor-pointer"
          />
        </div>
      </div>
      <div className="bg-gray-100 p-4 flex flex-col gap-2 mt-4">
        <p className="font-semibold">Homes</p>
        <p className="text-gray-500 hover:underline cursor-pointer">
          Bootstrap Templates, Business, Real Estate
        </p>
        <div>
          <Button
            mode="primary"
            className="p-2"
            onClick={() => {
              setShow(true);
            }}
          >
            Preview
          </Button>
        </div>
      </div>
      {show && <Preview />}
    </div>
  );
};

export default ItemProject;
