import { useContext } from "react";
import { checkConsecutiveEqual } from "../../utils";
import { TicAndToeContext } from "../../../../contexts/TicAndToeContext/TicAndToeContext";

const ItemCheck = ({ value, boxList }: { value: any; boxList: number[][] }) => {
  //
  const {
    ticAndToe: { rooms, roomId, socket, user },
    actions: { updateData },
    dispatch,
  } = useContext(TicAndToeContext);
  const handleClick = ({
    rowIndex,
    colIndex,
  }: {
    rowIndex: number;
    colIndex: number;
  }) => {
    const index = rooms.findIndex((item) => item.id === roomId);
    if (index === -1 || [...boxList][rowIndex][colIndex]) return;
    const newData = [...boxList];
    newData[rowIndex][colIndex] = rooms[index].owner.id === user?.id ? 1 : 2;
    const roomList = [...rooms];
    roomList[index].boxList = [...newData];
    socket.emit(`update-room-column`, {
      roomId,
      boxList: [...newData],
    });
    dispatch(updateData({ key: "rooms", value: [...roomList] }));
    if (checkConsecutiveEqual([...newData])) {
      //
      // socket.emit(`user-notify-${}`);
    }
  };
  //
  return (
    <div
      onClick={() => handleClick(value)}
      className="w-10 h-10 cursor-pointer hover:bg-blue-300 border border-solid border-gray-300 flex items-center justify-center"
    >
      {value.col === 1 ? (
        <i className="bx bx-check text-green-500 text-2xl" />
      ) : value.col === 2 ? (
        <i className="bx bx-x text-red-500 text-2xl" />
      ) : (
        ""
      )}
    </div>
  );
};

export default ItemCheck;
