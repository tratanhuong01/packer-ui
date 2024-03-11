import { useEffect, useState } from "react";
import { Prism as ReactSyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./index.scss";

const RenderData = () => {
  //
  const contexts: any[] = [
    {
      class: `“Tailwind CSS is the only framework that I've seen scale on large teams. 
      It’s easy to customize, adapts to any design, and the build size is tiny.”`,
      index: 3,
    },
    {
      class: `Sarah Dayan`,
      index: 6,
    },
    {
      class: `Staff Engineer, Algolia`,
      index: 8,
    },
    {
      class: `w-80 mx-auto`,
      index: 0,
    },
    {
      class: `w-28 h-28 object-cover rounded-full border-2 border-solid border-blue-500 
      mx-auto`,
      index: 1,
    },
    {
      class: `mt-4`,
      index: 2,
    },
    {
      class: `font-semibold mb-2`,
      index: 4,
    },
    {
      class: `text-blue-500 font-bold my-1.5`,
      index: 7,
    },
    {
      class: `underline mt-1`,
      index: 9,
    },
    {
      class: ` shadow-lg border border-gray-200 border-solid p-4 rounded-sm`,
      index: 0,
    },
    // {
    //   class: ``,
    //   index: 0,
    // },
    // {
    //   class: ``,
    //   index: 0,
    // },
    // {
    //   class: ``,
    //   index: 0,
    // },
    // {
    //   class: ``,
    //   index: 0,
    // },
  ];
  const [data, setData] = useState<any>({
    context0: "",
    context1: "",
    context2: "",
    context3: "",
    context4: "",
    context5: "",
    context6: "",
    context7: "",
    context8: "",
    context9: "",
    context10: "",
  });
  const [time, setTime] = useState(0);
  const [current, setCurrent] = useState(0);
  const [contextIndex, setContextIndex] = useState(0);
  const set = () => {
    const contextData = data[`context${[contexts[contextIndex].index]}`] || "";

    setData({
      ...data,
      [`context${contexts[contextIndex].index}`]:
        contextData + contexts[contextIndex].class.charAt(current),
    });
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps, no-labels
    let timeOut: any = setTimeout(() => {
      if (time === -1) return;
      setTime(time + 1);

      if (current + 1 > contexts[contextIndex].class.length) {
        set();
        setCurrent(0);
        if (contextIndex + 1 === contexts.length) {
          setTime(-1);
          return;
        }
        setContextIndex(contextIndex + 1);
      } else {
        setCurrent(current + 1);
      }
      set();
      clearTimeout(timeOut);
    }, 50);
    return () => {
      clearTimeout(timeOut);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);
  //
  return (
    <div className="w-full flex gap-1 flex-row items-start p-10 render-data">
      <div className="w-1/2">
        <figure className={data.context0}>
          <img
            className={data.context1}
            src="https://tailwindcss.com/_next/static/media/sarah-dayan.de9b3815.jpg"
            alt=""
          />
          <div className={data.context2}>
            <blockquote>
              <p className={data.context4}>{data.context3}</p>
            </blockquote>
            <figcaption className={data.context5}>
              <div className={data.context7}>{data.context6}</div>
              <div className={data.context9}>{data.context8}</div>
            </figcaption>
          </div>
        </figure>
      </div>
      <div className="w-1/2">
        <ReactSyntaxHighlighter
          language="tsx"
          wrapLines={true}
          wrapLongLines={true}
          style={prism}
        >
          {`
<figure className="${data.context0}">
  <img
    className="${data.context1}"
    src="https://tailwindcss.com/_next/static/media/sarah-dayan.de9b3815.jpg"
    alt=""
  />
  <div className="${data.context2}">
    <blockquote>
      <p className="${data.context4}">${data.context3}</p>
    </blockquote>
    <figcaption className="${data.context5}">
      <div className="${data.context7}">${data.context6}</div>
      <div className="${data.context9}">${data.context8}</div>
    </figcaption>
  </div>
</figure>`}
        </ReactSyntaxHighlighter>
      </div>
    </div>
  );
};

export default RenderData;
