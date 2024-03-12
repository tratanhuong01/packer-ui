import { useState } from "react";
import Box from "../Box";
import Parent from "../Parent";

const Pagination = ({
  length,
  current,
  limit,
}: {
  length: number;
  current: number;
  limit: number;
}) => {
  //
  const [active, setActive] = useState(current);
  //
  return (
    <Parent items="center" justify="center" gap={8} className="mx-auto my-4">
      {new Array(Math.ceil(length / limit))
        .fill(0)
        .map((_, index) => index + 1)
        .map((item) => (
          <Box
            handleClick={() => {
              setActive(item);
            }}
            width={40}
            height={40}
            key={item}
            border={`border border-solid border-blue-500`}
            className={`transition-colors rounded-full cursor-pointer hover:bg-blue-500 hover:text-white ${
              item === active
                ? "bg-blue-500 text-white font-semibold"
                : "text-gray-500"
            }`}
          >
            {item}
          </Box>
        ))}
    </Parent>
  );
};

export default Pagination;
