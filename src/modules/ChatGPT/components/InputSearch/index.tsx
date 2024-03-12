import { ChangeEvent, KeyboardEvent, useState } from "react";
import Box from "../../../../components/Box";
import useSearchData from "../../../../hooks/useSearchData";

const InputSearch = ({ scrollTop }: { scrollTop: Function }) => {
  //
  const [value, setValue] = useState("");
  const { handleClick, current, isDone } = useSearchData({
    callback: () => {
      setValue("");
      scrollTop();
    },
    value,
  });
  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleClick("start");
    }
  };

  //
  return (
    <div className="w-full">
      {!current && (
        <div
          className="grid gap-1.5 mb-5"
          style={{ gridTemplateColumns: "1fr 1fr" }}
        >
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="p-2.5 rounded-lg border border-gray-300 border-solid cursor-pointer relative 
            hover:bg-gray-100"
            >
              <Box
                width={25}
                height={25}
                className="rounded-lg absolute top-1/2 transform-y-center right-3 bg-white border border-solid 
              border-gray-200 text-gray-500 text-xl"
              >
                <i className="bx bx-up-arrow-alt" />
              </Box>
              <p className="font-semibold text-sm">Create a content calendar</p>
              <p className="text-xs text-gray-400">for a TikTok account</p>
            </div>
          ))}
        </div>
      )}
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Message ChatGPT..."
          className="w-full p-3 rounded-xl border border-gray-300 border-solid"
          value={value}
          spellCheck={false}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setValue(event.target.value)
          }
          onKeyUp={handleKeyPress}
        />
        <Box
          handleClick={() => handleClick("stop")}
          width={32}
          height={32}
          disabled={!(!isDone || value)}
          className={`rounded-lg absolute top-1/2 transform-y-center right-3 text-2xl ${
            value ? "bg-green-500 cursor-pointer" : ""
          } ${isDone ? "bg-gray-200" : "cursor-pointer"}`}
        >
          {isDone ? (
            <i className="bx bx-up-arrow-alt text-white" />
          ) : (
            <i className="bx bx-stop-circle"></i>
          )}
        </Box>
      </div>
      <p className="text-xs text-gray-500 font-semibold text-center py-4">
        ChatGPT can make mistakes. Consider checking important information.
      </p>
    </div>
  );
};

export default InputSearch;
