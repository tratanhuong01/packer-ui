import ReactSyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import useCopyText from "../../../../../hooks/useCopyText";

const CodeResult = ({ content, type }: { content: string; type: string }) => {
  //
  const { copy, handleClick } = useCopyText(content);
  //
  return (
    <div className="relative mt-5">
      <div className="w-full text-xs rounded-t-lg py-2 bg-gray-500 text-gray-300 px-2 flex items-center justify-between">
        <span>{type}</span>
        <div
          onClick={handleClick}
          className="flex items-center gap-1 cursor-pointer hover:text-gray-100"
        >
          <i className={`bx bx-${copy ? "check" : "copy-alt"}`}></i>
          <span>{copy ? "Copied" : "Copy code"}</span>
        </div>
      </div>
      <div>
        <ReactSyntaxHighlighter
          language={type}
          wrapLines={true}
          wrapLongLines={true}
          style={tomorrowNight}
        >
          {content}
        </ReactSyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeResult;
