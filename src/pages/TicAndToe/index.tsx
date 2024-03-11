import { ReactNode, useState } from "react";
import Box from "../../components/Box";
import { TicAndToeProvider } from "../../contexts/TicAndToeContext/TicAndToeContext";

const TicAndToe = () => {
  //
  const [boxList, setBoxList] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, setUser] = useState(0);
  const checkConsecutiveEqual = () => {
    for (let j = 0; j < boxList.length; j++) {
      for (let i = 0; i < boxList[j].length; i++) {
        if (boxList[j][i]) {
          if (
            boxList[j][i] === boxList[j + 1][i + 1] &&
            boxList[j][i] === boxList[j + 2][i + 2] &&
            boxList[j][i] === boxList[j + 3][i + 3]
          )
            return true;
          if (i - 3 >= 0) {
            if (
              boxList[j][i] === boxList[j + 1][i - 1] &&
              boxList[j][i] === boxList[j + 2][i - 2] &&
              boxList[j][i] === boxList[j + 3][i - 3]
            )
              return true;
          }
          if (
            boxList[j][i] === boxList[j][i + 1] &&
            boxList[j][i] === boxList[j][i + 2] &&
            boxList[j][i] === boxList[j][i + 3]
          )
            return true;
          if (
            boxList[j][i] === boxList[j + 1][i] &&
            boxList[j][i] === boxList[j + 2][i] &&
            boxList[j][i] === boxList[j + 3][i]
          )
            return true;
        }
      }
    }
    return false;
  };
  const checkWin = () => {
    let newData: number[] = [];
    boxList.forEach((row) => {
      newData = [...newData, ...row];
    });
    let isWin = checkConsecutiveEqual();
    if (isWin) {
      alert("You win!");
    }
  };
  //
  return (
    <WrapperGame>
      <div className="w-full h-screen flex flex-col">
        <div className="flex flex-1"></div>
        <div
          className="grid mx-auto my-20"
          style={{ gridTemplateColumns: "repeat(16, 40px)" }}
        >
          {boxList.map((row, rowIndex) =>
            row.map((col, colIndex) => (
              <Box
                width={40}
                height={40}
                handleClick={() => {
                  const data = [...boxList];
                  data[rowIndex][colIndex] = 1;
                  setBoxList([...data]);
                  setUser(1);
                  checkWin();
                }}
                className="cursor-pointer hover:bg-blue-300"
                border="border border-solid border-gray-300"
                key={Math.random()}
              >
                {col === 1 ? (
                  <i className="bx bx-check text-green-500 text-2xl" />
                ) : col === 2 ? (
                  <i className="bx bx-x text-red-500 text-2xl" />
                ) : (
                  ""
                )}
              </Box>
            ))
          )}
        </div>
      </div>
    </WrapperGame>
  );
};
const WrapperGame = ({ children }: { children: ReactNode }) => {
  return <TicAndToeProvider>{children}</TicAndToeProvider>;
};

export default TicAndToe;
