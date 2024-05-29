import { useEffect, useState } from "react";
import Square from "../Square";

const ScrollTop = () => {
  //
  const [scrollTop, setScrollTop] = useState(
    (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop
  );
  const onScroll = () => {
    setScrollTop(
      (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop
    );
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  //
  return (
    <div>
      <div
        className="h-1 bg-primary shadow-xxl rounded-sm fixed z-50 top-0 left-0"
        style={{
          width: `${(scrollTop / document.body.scrollHeight) * 100}%`,
        }}
      ></div>
      {scrollTop > 200 ? (
        <Square
          style={{
            width: 50,
            height: 50,
          }}
          className="fixed bottom-10 right-4 z-20 border border-solid border-primary text-primary bg-white 
        rounded-full cursor-pointer hover:bg-primary hover:text-white"
          handleClick={() => window.scrollTo(0, 0)}
        >
          <i className="bx bx-arrow-to-top text-2xl" />
        </Square>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ScrollTop;
