import { ReactNode } from "react";

const TitleDescription = ({
  children,
  type,
}: {
  children: ReactNode;
  type: "big" | "normal" | "small";
}) => {
  return (
    <p
      className={`${
        type === "big"
          ? "text-4xl pb-2 mt-6 font-bold"
          : type === "normal"
          ? "text-2xl pb-1 mt-6 font-bold"
          : "pb-0.5"
      }`}
    >
      {children}
    </p>
  );
};

export default TitleDescription;
