import { useContext, useState } from "react";
import { TicAndToeContext } from "../../../../contexts/TicAndToeContext/TicAndToeContext";
import Modal from "../../../../components/Modal";

const Header = () => {
  //
  const {
    ticAndToe: { roomId, rooms, socket, user },
    actions: { updateData },
    dispatch,
  } = useContext(TicAndToeContext);
  const [show, setShow] = useState(false);
  //
  return (
    <div className="flex h-40 py-3 w-full px-20 justify-between items-center relative">
      {roomId &&
        rooms
          .find((item) => item.id === roomId)
          ?.members.map((item) => (
            <div
              key={item.id}
              className="bg-gray-100 px-5 w-72 py-5 rounded-sm font-semibold text-black"
            >
              <p className="items-center flex gap-2 mb-2">
                Name:{" "}
                <span className="rounded-full text-sm px-2 py-1 bg-green-500 text-white pl-2 inline-block">
                  {item.name}
                </span>
              </p>
              <p>SocketID: {item.socketId}</p>
            </div>
          ))}
      <div
        className="absolute top-1/2 left-1/2 transform flex items-center justify-center"
        style={{ transform: `translateY(-50%)` }}
      >
        <i
          onClick={() => setShow(true)}
          className="bx bx-log-out text-red-600 text-4xl w-12 h-12 rounded-full bg-white border border-solid 
        border-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white cursor-pointer"
        ></i>
      </div>
      {show && (
        <Modal
          closeModal={() => setShow(false)}
          headerTitle="Exit game?"
          footerButtonRender={
            <div className="flex gap-1">
              <button
                onClick={() => setShow(false)}
                className="px-4 text-white font-semibold bg-gray-500 rounded-sm py-2"
              >
                Close
              </button>
              <button
                onClick={() => {
                  dispatch(updateData({ key: "level", value: 2 }));
                  dispatch(updateData({ key: "roomId", value: null }));
                  socket.emit("out-room", { roomId, userId: user?.id });
                }}
                className="px-4 text-white font-semibold bg-green-500 rounded-sm py-2"
              >
                OK
              </button>
            </div>
          }
        >
          <div className="px-2 py-2">
            <p className="font-bold text-xl mb-1">
              Do you want exit to the game?
            </p>
            <p className="text-sm text-gray-500">
              If you exit, the winner will be your opponent.Press{" "}
              <span className="font-bold text-red-500">OK</span> if you agree.
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Header;
