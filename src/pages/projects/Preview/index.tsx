import { Portal } from "../../../components/Modal";

const Preview = () => {
  return (
    <Portal>
      <div className="w-full h-screen overflow-hidden fixed top-0 left-0 bg-gray-100 z-50 flex flex-col">
        <div className="px-4 flex justify-between items-center text-white bg-gray-700">
          <div></div>
          <ul className="flex justify-center items-center">
            <li
              className="w-10 h-10 border border-solid border-gray-600 flex justify-center items-center 
                bx bx-x text-xl cursor-pointer"
            ></li>
            <li
              className="w-10 h-10 border border-solid border-gray-600 flex justify-center items-center 
                bx bx-x text-xl cursor-pointer"
            ></li>
          </ul>
        </div>
        <div className="flex-1">
          <iframe
            src="https://react-duolingo.vercel.app/"
            title="text"
            className="w-80 mx-auto h-full bg-white"
          ></iframe>
        </div>
      </div>
    </Portal>
  );
};

export default Preview;
