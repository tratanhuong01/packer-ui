import { ReactNode, useState } from "react";
import ReactSyntaxHighlighter from "react-syntax-highlighter";
// import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import Box from "../Box";
import Parent from "../Parent";
import { stackoverflowDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const ShowComponent = (props: {
  component: ReactNode;
  code: { collapse: string; expand: string };
}) => {
  //
  const [collapse, setCollapse] = useState(false);
  const nav = [
    { icon: "bx-bx-user", handle: () => "" },
    { icon: "bx bxl-squarespace", handle: () => "" },
    {
      icon: "bx bx-copy",
      handle: async () => {
        const textArea = document.createElement("textarea");
        textArea.value = !collapse ? props.code.collapse : props.code.expand;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand("copy");
          alert("Copy successfully");
        } catch (err) {
          console.error("Unable to copy to clipboard", err);
        }
        document.body.removeChild(textArea);
      },
    },
    { icon: "bx bx-fullscreen", handle: () => "" },
    { icon: "bx bx-revision", handle: () => "" },
    { icon: "bx bx-dots-vertical-rounded", handle: () => "" },
  ];
  //
  return (
    <div className="code">
      <Parent className="w-full py-8" justify="center" items="center">
        {props.component}
      </Parent>
      <Parent justify="space-between" className="py-4">
        <div></div>
        <Parent items="center" gap={5}>
          <span
            onClick={() => {
              setCollapse(!collapse);
            }}
            className="flex items-center justify-center px-2 py-1 border border-solid border-gray-200 
            rounded-full text-xs font-semibold text-blue-500 w-24 cursor-pointer"
          >
            {collapse ? "Collapse code" : "Expand code"}
          </span>
          {nav.map((item) => (
            <Box
              handleClick={item.handle}
              key={item.icon}
              width={32}
              height={32}
              rounded
              className={`hover:bg-gray-100 cursor-pointer ${item.icon}`}
            ></Box>
          ))}
        </Parent>
      </Parent>
      <div className="border-2 border-solid border-gray-200 focus-within:border-blue-500 text-xs md:text-base">
        {!collapse ? (
          <ReactSyntaxHighlighter
            language="jsx"
            wrapLines={true}
            // wrapLongLines={true}
            style={stackoverflowDark}
          >
            {props.code ? props.code.collapse : ""}
          </ReactSyntaxHighlighter>
        ) : (
          <ReactSyntaxHighlighter
            language="jsx"
            wrapLines={true}
            // wrapLongLines={true}
            style={stackoverflowDark}
          >
            {props.code ? props.code.expand : ""}
          </ReactSyntaxHighlighter>
        )}
      </div>
    </div>
  );
};

export default ShowComponent;
