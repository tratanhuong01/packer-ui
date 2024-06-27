import { useEffect, useState } from "react";

const useCopyText = (content?: string, callback?: Function) => {
  const [copy, setCopy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(2);
  const handleClick = () => {
    setCopy(true);
    setLoading(true);
    navigator.clipboard.writeText(content || "");
  };
  let timeOut: any;

  useEffect(() => {
    if (!copy) return;
    clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    timeOut = setTimeout(() => {
      if (time === 0) {
        setTime(2);
        setCopy(false);
        setLoading(false);
        clearTimeout(timeOut);
        callback && callback();
        return;
      }
      setTime(time - 1);
    }, 500);
  }, [time, copy]);
  return { copy, handleClick, loading };
};

export default useCopyText;
