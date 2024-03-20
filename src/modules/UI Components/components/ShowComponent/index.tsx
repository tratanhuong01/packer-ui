import { ReactNode, useState } from "react";
import ReactSyntaxHighlighter from "react-syntax-highlighter";
import { stackoverflowDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Parent from "../../../../components/Parent";
import Box from "../../../../components/Box";

const ShowComponent = ({
  component,
  code,
}: {
  component: ReactNode;
  code?: { collapse: string; expand: string };
}) => {
  //
  const [collapse, setCollapse] = useState(false);
  const nav = [
    { icon: "bx-bx-user", handle: () => "" },
    { icon: "bx bxl-squarespace", handle: () => "" },
    {
      icon: "bx bx-copy",
      handle: async () => {
        navigator.clipboard.writeText(
          (!collapse ? code?.collapse : code?.expand) || ""
        );
        alert("Copy successfully");
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
        {component}
      </Parent>
      <Parent justify="space-between" className="py-4">
        <div></div>
        <Parent items="center" gap={5}>
          <span
            onClick={() => {
              setCollapse(!collapse);
            }}
            className="flex items-center justify-center px-2 py-1 border border-solid border-gray-200 
            rounded-full text-xs font-semibold text-blue-500 w-24 cursor-pointer whitespace-nowrap"
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
      {code && (
        <div
          className="border-2 border-solid border-gray-200 focus-within:border-blue-500 text-xs md:text-base 
        code rounded-xl overflow-hidden"
        >
          {!collapse ? (
            <ReactSyntaxHighlighter
              language="jsx"
              wrapLines={true}
              // wrapLongLines={true}
              style={stackoverflowDark}
            >
              {code ? code.collapse : ""}
            </ReactSyntaxHighlighter>
          ) : (
            <ReactSyntaxHighlighter
              language="jsx"
              wrapLines={true}
              // wrapLongLines={true}
              style={stackoverflowDark}
            >
              {code ? code.expand : ""}
            </ReactSyntaxHighlighter>
          )}
        </div>
      )}
    </div>
  );
};

export default ShowComponent;
