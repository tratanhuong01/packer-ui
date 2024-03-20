export const checkConsecutiveEqual = (boxList: number[][]) => {
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
