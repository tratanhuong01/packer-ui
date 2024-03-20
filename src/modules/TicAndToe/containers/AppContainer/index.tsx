/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef } from "react";
import ItemCheck from "../../components/ItemCheck";
import Header from "../../components/Header";
import ModalBegin from "../ModalBegin";
import { TicAndToeContext } from "../../../../contexts/TicAndToeContext/TicAndToeContext";
// import music from "../../../../assets/music/music.mp3";

const AppContainer = () => {
  //
  const {
    ticAndToe: { rooms, user, level, socket, roomId },
    actions: { updateData },
    dispatch,
  } = useContext(TicAndToeContext);
  const audioRef = useRef<HTMLAudioElement>(null);
  const room = rooms.find((item) => item.id === roomId);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.2;
  }, [audioRef, user]);
  useEffect(() => {
    socket.on("load-rooms", (res: any) => {
      dispatch(updateData({ key: "rooms", value: res }));
    });
    socket.emit("update-rooms");
  }, []);
  useEffect(() => {
    if (user) {
      socket.on(`join-room-auto-${user.id}`, (roomId: number) => {
        dispatch(updateData({ key: "level", value: 3 }));
        dispatch(updateData({ key: "roomId", value: roomId }));
      });
    }
  }, [user]);
  useEffect(() => {
    if (roomId) {
      socket.on(`update-room-change-${roomId}`, (boxList: number[][]) => {
        const index = rooms.findIndex((item) => item.id === roomId);
        if (index === -1) return;
        const roomList = [...rooms];
        roomList[index].boxList = boxList;
        dispatch(updateData({ key: "rooms", value: [...roomList] }));
      });
    }
  }, [roomId]);
  //
  return (
    <div
      className="w-full absolute top-0 left-0 bottom-0 right-0 flex flex-col items-center justify-center bg-cover"
      style={{
        // backgroundImage: "url('')",
        backgroundImage:
          "url('https://t4.ftcdn.net/jpg/00/78/03/25/360_F_78032552_L23lEYCqjq1GrbaKZI3MN4JJLPz3kqqw.jpg')",
        backgroundRepeat: "no-repeat",
      }}
    >
      {user && level === 3 && roomId ? (
        <>
          <audio hidden ref={audioRef} src={""} autoPlay loop />
          <Header />
          <div className="flex-1 flex items-center justify-center">
            <div
              className="grid mx-auto bg-white"
              style={{ gridTemplateColumns: "repeat(10, 40px)" }}
            >
              {room &&
                room.boxList.map((row, rowIndex) =>
                  row.map((col, colIndex) => (
                    <ItemCheck
                      value={{
                        col,
                        colIndex,
                        rowIndex,
                      }}
                      key={Math.random()}
                      boxList={
                        []
                        // rooms.find((item) => item.id === roomId) === null
                        //   ? []
                        //   : rooms.find((item) => item.id === roomId)?.boxList
                      }
                    />
                  ))
                )}
            </div>
          </div>
        </>
      ) : (
        <ModalBegin />
      )}
    </div>
  );
};

export default AppContainer;
