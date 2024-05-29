import { ChangeEvent, ReactNode, useState } from "react";
import ReactSyntaxHighlighter from "react-syntax-highlighter";
import { stackoverflowDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Parent from "../../../../components/Parent";
import Box from "../../../../components/Box";
import TitleDescription from "../TitleDescription";

const ShowComponent = ({
  component,
  code,
  title,
}: {
  component: ReactNode;
  code?: { collapse: string; expand: string };
  title?: string;
}) => {
  //
  const [editor, setEditor] = useState(code);
  const [show, setShow] = useState(false);
  const [value, setValue] = useState(editor ? editor.collapse : "");
  const nav = [
    { icon: "bx-bx-user", handle: () => "" },
    { icon: "bx bxl-squarespace", handle: () => "" },
    {
      icon: "bx bx-copy",
      handle: async () => {
        navigator.clipboard.writeText(
          (show ? code?.expand : code?.collapse) || ""
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
      <TitleDescription type="normal">{title}</TitleDescription>
      <Parent className="w-full py-8" justify="center" items="center">
        {component}
      </Parent>
      <Parent justify="space-between" className="py-4">
        <div></div>
        <Parent items="center" gap={5}>
          <span
            onClick={() => {
              setShow(!show);
              editor && setValue(editor[!show ? "expand" : "collapse"]);
            }}
            className="flex items-center justify-center px-2 py-1 border border-solid border-gray-200 
            rounded-full text-xs font-semibold text-primary w-24 cursor-pointer whitespace-nowrap"
          >
            {show ? "Collapse code" : "Expand code"}
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
          className="border-2 border-solid border-gray-200 focus-within:border-primary text-xs md:text-base 
        code rounded-xl overflow-hidden relative"
        >
          <textarea
            className="absolute top-0 left-0 p-5 right-0 bottom-0 bg-transparent text-transparent 
            caret-white resize-none"
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              if (!editor) return;
              setEditor({
                ...editor,
                [show ? "expand" : "collapse"]: e.target.value,
              });
              setValue(e.target.value);
            }}
            value={value}
            spellCheck={false}
          />

          {show ? (
            <ReactSyntaxHighlighter
              language="jsx"
              wrapLines={true}
              // wrapLongLines={true}
              style={stackoverflowDark}
            >
              {editor ? editor.expand : " "}
            </ReactSyntaxHighlighter>
          ) : (
            <ReactSyntaxHighlighter
              language="jsx"
              wrapLines={true}
              // wrapLongLines={true}
              style={stackoverflowDark}
            >
              {editor ? editor.collapse : " "}
            </ReactSyntaxHighlighter>
          )}
        </div>
      )}
    </div>
  );
};

export default ShowComponent;
