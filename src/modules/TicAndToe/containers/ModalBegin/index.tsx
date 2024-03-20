/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useContext, useEffect, useState } from "react";
import { boxList } from "../../template";
import { TicAndToeContext } from "../../../../contexts/TicAndToeContext/TicAndToeContext";
import Modal from "../../../../components/Modal";
import { UserProps } from "../../../../contexts/TicAndToeContext/types";

const ModalBegin = () => {
  //
  const [name, setName] = useState("");
  const [remember, setRemember] = useState(false);
  const {
    ticAndToe: { level, user, rooms, socket },
    actions: { updateData },
    dispatch,
  } = useContext(TicAndToeContext);
  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      const u = JSON.parse(sessionStorage.getItem("user") || "null");
      dispatch(
        updateData({
          key: "user",
          value: u,
        })
      );
      dispatch(
        updateData({
          key: "level",
          value: 2,
        })
      );
      socket.emit("add-user", u);
    }
  }, []);
  useEffect(() => {
    if (user) {
      socket.on(`retrieve-user-${user.id}`, (u: UserProps) => {
        dispatch(updateData({ key: "user", value: u }));
        sessionStorage.setItem("user", JSON.stringify(u));
      });
    }
  }, [user?.id]);
  //
  return (
    <Modal
      width={level === 1 ? 500 : 700}
      childrenModal="true"
      headerTitle={level === 1 ? "Begin" : "Choose room"}
      footerButton={[
        {
          id: Math.random(),
          handle: () => {
            const u = {
              id: Math.random(),
              name,
              socketId: null,
            };
            socket.emit("add-user", u);
            dispatch(
              updateData({
                key: "user",
                value: u,
              })
            );
            dispatch(
              updateData({
                key: "level",
                value: 2,
              })
            );
            remember && sessionStorage.setItem("user", JSON.stringify(u));
          },
          name: "Login",
          type: "confirm",
        },
      ]}
    >
      {level === 1 ? (
        <>
          <input
            type="text"
            placeholder="Type name to start game..."
            className="w-full p-2.5 border border-gray-200 border-solid rounded-sm"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            spellCheck={false}
          />
          <div className="flex items-center gap-2 font-semibold pt-4 pl-1 text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              id="remember"
              className="scale-110"
              onChange={(e) => setRemember(e.target.checked)}
              checked={remember}
            />
            <label htmlFor="remember">Remember</label>
          </div>
        </>
      ) : (
        <div className="w-full">
          <div className="flex justify-between items-center pt-3 pb-5 border-b-2">
            <span className="font-bold text-xl text-gray-600">
              Hello {user?.name}
            </span>
            <button
              onClick={() => {
                const room = {
                  id: Math.random(),
                  owner: user,
                  members: [user],
                  boxList,
                };
                dispatch(
                  updateData({
                    key: "rooms",
                    value: [...rooms, room],
                  })
                );
                dispatch(
                  updateData({
                    key: "roomId",
                    value: room.id,
                  })
                );
                socket.emit("add-room", room);
                dispatch(
                  updateData({
                    key: "level",
                    value: 3,
                  })
                );
              }}
              className="px-4 text-white font-semibold bg-green-500 rounded-sm py-2"
            >
              Create room
            </button>
          </div>
          {rooms.length === 0 ? (
            <div className="w-full h-72 flex items-center justify-center text-xl text-gray-500">
              No any room.
            </div>
          ) : (
            <ul
              className="grid gap-4 pt-4 pb-12 pr-8"
              style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr" }}
            >
              {rooms.map((item) => (
                <li
                  onClick={() => {
                    if (item.members.length === 2) return;
                    socket.emit("update-room", { room: item, user });
                    dispatch(updateData({ key: "roomId", value: item.id }));
                    dispatch(updateData({ key: "level", value: 3 }));
                    socket.emit(`load-to-room`, {
                      ownerId: item.owner.id,
                      roomId: item.id,
                    });
                  }}
                  key={item.id}
                  className={`flex flex-col items-center mt-12 justify-center
                  relative ${
                    item.members.length !== 2
                      ? "cursor-pointer"
                      : "cursor-not-allowed"
                  }`}
                >
                  <i
                    className={`bx bx-joystick text-8xl text-${
                      item.members.length !== 2 ? "green" : "gray"
                    }-500`}
                  />
                  <p className="text-xs font-bold text-gray-500 text-center mb-3">
                    {item.owner.name} (Owner)
                  </p>
                  <span
                    className={`flex items-center justify-center px-2 py-1 font-semibold text-sm border-4 border-solid 
                  border-${
                    item.members.length === 2 ? "gray" : "green"
                  }-500 text-${
                      item.members.length === 2 ? "gray" : "green"
                    }-500 absolute -top-4 -right-3 bg-white transform rotate-45`}
                  >
                    {item.members.length === 2 ? "Full Room" : "Active Room"}
                  </span>
                  <span
                    className={`text-sm font-semibold text-${
                      item.members.length === 2 ? "gray" : "orange"
                    }-600`}
                  >{`(${item.members.length}/2)`}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </Modal>
  );
};

export default memo(ModalBegin);
