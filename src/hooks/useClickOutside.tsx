import { useRef, useEffect, MouseEvent } from "react";

interface ClickOutsideProps {
  handleClick: (boolean: Boolean | null) => void;
}

const useClickOutside = ({ handleClick }: ClickOutsideProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const clickOutside: any = (event: MouseEvent) => {
    handleClick(ref.current && !ref.current.contains(event.target as Node));
  };

  useEffect(() => {
    document.addEventListener("click", clickOutside);

    return () => {
      document.removeEventListener("click", clickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleClick]);

  return ref;
};

export default useClickOutside;
