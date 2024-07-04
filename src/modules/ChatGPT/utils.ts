import { TextProps } from "./interfaces/Message";

const convertHTMLString = (str: string): TextProps[] => {
  return str
    .substring(1, str.length - 1)
    .split("```")
    .map((item): TextProps => {
      let isCode = "";

      if (item.indexOf("javascript\\n") !== -1) isCode = "javascript";
      if (item.indexOf("typescript\\n") !== -1) isCode = "typescript";
      if (item.indexOf("java\\n") !== -1) isCode = "java";
      if (item.indexOf("csharp\\n") !== -1) isCode = "csharp";
      if (item.indexOf("cpp\\n") !== -1) isCode = "cpp";
      if (item.indexOf("python\\n") !== -1) isCode = "python";
      if (item.indexOf("nodejs\\n") !== -1) isCode = "nodejs";
      if (item.indexOf("php\\n") !== -1) isCode = "php";

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
          type: isCode,
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

const formatDate = (date: Date) => {
  let day = String(date.getDate()).padStart(2, "0");
  let month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  let year = date.getFullYear();
  let hours = String(date.getHours()).padStart(2, "0");
  let minutes = String(date.getMinutes()).padStart(2, "0");
  let seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

export { convertHTMLString, generateUUID, formatDate };
