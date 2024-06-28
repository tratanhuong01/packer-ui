import { TextProps } from "./interfaces/Message";

const convertHTMLString = (str: string): TextProps[] => {
  return str
    .substring(1, str.length - 1)
    .split("```")
    .map((item): TextProps => {
      let isCode = false;

      if (item.indexOf("javascript\\n") !== -1) isCode = true;
      if (item.indexOf("typescript\\n") !== -1) isCode = true;
      if (item.indexOf("java\\n") !== -1) isCode = true;
      if (item.indexOf("csharp\\n") !== -1) isCode = true;
      if (item.indexOf("cpp\\n") !== -1) isCode = true;
      if (item.indexOf("python\\n") !== -1) isCode = true;
      if (item.indexOf("nodejs\\n") !== -1) isCode = true;
      if (item.indexOf("php\\n") !== -1) isCode = true;

      if (!isCode) {
        return {
          id: generateUUID(),
          content: item.replaceAll("\\n", "<br />"),
          type: "text",
        };
      } else {
        return {
          id: generateUUID(),
          content: item
            .replaceAll(
              "\\n",
              `
    `
            )
            .replaceAll("javascript", "")
            .replaceAll("java", "")
            .replaceAll("csharp", "")
            .replaceAll("cpp", "")
            .replaceAll("typescript", "")
            .replaceAll("py", "")
            .replaceAll("python", "")
            .replaceAll("nodejs", "")
            .replaceAll("php", ""),
          // .replaceAll("\\", ""),
          type: "code",
        };
      }
    });
};
const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
export { convertHTMLString, generateUUID };
