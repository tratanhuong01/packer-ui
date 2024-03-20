import { useRef, useEffect, MouseEvent } from "react";

interface ClickOutsideProps {
  handleClick: (boolean: Boolean | null) => void;
  status: boolean;
}

const useClickOutside = ({ handleClick, status }: ClickOutsideProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const refPop = useRef<HTMLDivElement>(null);
  const handleClickCustom = () => {
    handleClick(false);
  };
  const clickOutside: any = (event: MouseEvent) => {
    const outside = ref.current && !ref.current.contains(event.target as Node);
    if (outside) {
      ref.current?.removeEventListener("click", handleClickCustom);
      document.removeEventListener("click", clickOutside);
      handleClick(outside);
      return;
    }
  };

  useEffect(() => {
    if (status) {
      document.addEventListener("click", clickOutside);
    } else {
      ref.current?.addEventListener("click", handleClickCustom);
    }
    return () => {
      document.removeEventListener("click", clickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, ref.current]);

  return { ref, refPop };
};

export default useClickOutside;
