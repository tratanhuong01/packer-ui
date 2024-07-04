import { useRef, useEffect, MouseEvent, useState } from "react";

interface ClickOutsideProps {
  callback: Function;
}

const getAllDescendants = (node: any) => {
  let nodes: any[] = [];
  node.childNodes.forEach((child: any) => {
    nodes.push(child);
    nodes = nodes.concat(getAllDescendants(child));
  });
  return nodes;
};

const useClickOutside = (props?: ClickOutsideProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const refPopup = useRef<HTMLDivElement>(null);
  const clickOutside: any = (event: MouseEvent) => {
    if (!ref.current) return;
    let children = getAllDescendants(ref.current);
    let outside = children.find((item) => item === (event.target as any));
    if (refPopup.current?.contains(outside)) {
      outside = null;
    }
    if (!outside) {
      setIsOpen(false);
      return;
    }
  };
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", clickOutside);
    } else {
      document.removeEventListener("click", clickOutside);
    }
    return () => {
      document.removeEventListener("click", clickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, ref.current]);

  return { ref, refPopup, isOpen, setIsOpen };
};

export default useClickOutside;
