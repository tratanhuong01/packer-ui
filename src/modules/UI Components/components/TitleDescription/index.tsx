import { ChangeEvent, ReactNode, useEffect, useRef } from "react";

const TitleDescription = ({
  children,
  type,
  isEditor,
  onBlur,
  onDoubleClick,
  onInput,
}: {
  children: ReactNode;
  type: "big" | "normal" | "description";
  isEditor?: boolean;
  onBlur?: Function;
  onDoubleClick?: Function;
  onInput?: Function;
}) => {
  //
  const ref = useRef<HTMLParagraphElement>(null);
  const focus = () => {
    ref.current && ref.current.focus();
    let sel = window.getSelection();
    ref.current && sel?.selectAllChildren(ref.current);
    sel?.collapseToEnd();
  };
  //
  useEffect(() => {
    if (isEditor) focus();
  }, [isEditor]);
  //
  return (
    <p
      onDoubleClick={() => onDoubleClick && onDoubleClick()}
      onInput={(e: ChangeEvent<HTMLDivElement>) => {
        onInput && onInput(e.currentTarget.innerText);
        focus();
      }}
      ref={ref}
      className={`${
        type === "big"
          ? "text-4xl pt-6 pb-2 font-bold"
          : type === "normal"
          ? "text-2xl pb-2 pt-6 font-bold"
          : "py-0.5"
      }`}
      onBlur={() => onBlur && onBlur()}
      spellCheck={false}
      contentEditable={isEditor}
      suppressContentEditableWarning
    >
      {children}
    </p>
  );
};

export default TitleDescription;
