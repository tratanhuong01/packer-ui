import { useState } from "react";
import ReactSyntaxHighlighter from "react-syntax-highlighter";
import { stackoverflowDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

type DataProps = {
  id: number;
  code: string;
  type: "npm" | "yarn";
};

const InstallationCode = ({
  node,
  code,
}: {
  node?: { npm: string; yarn: string };
  code?: string;
}) => {
  //
  const data: DataProps[] = [
    {
      id: 1,
      code: node?.npm || "npm ...",
      type: "npm",
    },
    {
      id: 2,
      code: node?.yarn || "yarn ...",
      type: "yarn",
    },
  ];
  const [active, setActive] = useState<DataProps>(data[0]);
  //
  return (
    <div className="rounded-xl overflow-hidden mt-3 code">
      {node && (
        <ul className="bg-black text-white flex items-center gap-6 pt-2 pb-4 px-4">
          {data.map((item) => (
            <li
              onClick={() => setActive(item)}
              className={`cursor-pointer border-b-2 border-solid pb-1 ${
                active.id === item.id ? "border-primary" : "border-transparent"
              } px-2`}
            >
              {item.type}
            </li>
          ))}
        </ul>
      )}
      <ReactSyntaxHighlighter
        language="jsx"
        wrapLines={true}
        // wrapLongLines={true}
        style={stackoverflowDark}
      >
        {code || active.code}
      </ReactSyntaxHighlighter>
    </div>
  );
};

export default InstallationCode;
