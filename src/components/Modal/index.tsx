import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import "./index.scss";
import Overlay from "../Overlay";
import ModalProps from "./type";
import Parent from "../Parent";
import Box from "../Box";
import Button from "../Button";
import useClickOutside from "../../hooks/useClickOutside";

const Portal = ({ children }: { children?: ReactNode }) => {
  //
  const modalRoot = document.getElementById("modal-root");
  const el = document.createElement("div");
  useEffect(() => {
    modalRoot?.appendChild(el);
    document.body.style.overflow = "hidden";
    return () => {
      modalRoot?.removeChild(el);
      document.body.style.overflow = "";
    };
  }, [el, modalRoot]);
  //
  return createPortal(children, el);
};

const Modal = (props: ModalProps) => {
  //
  const { children, width, headerTitle, closeModal, footerButton } = props;
  const refContent = useClickOutside({
    handleClick: (bool) => {
      bool && closeModal && closeModal();
    },
  });
  //
  return (
    <Portal>
      <Overlay isPosition="fixed" />
      <Parent
        justify="center"
        items="center"
        className="w-full h-screen fixed top-0 left-0 zoomIn"
      >
        <div
          ref={refContent}
          className="w-full bg-white rounded-sm"
          style={{ width: `${width || 500}px` }}
        >
          {headerTitle && (
            <Parent justify="center" items="center">
              <div
                className={`w-full p-3 ${
                  headerTitle ? "border-b border-solid border-gray-200" : ""
                } relative`}
              >
                {headerTitle && (
                  <p className="text-2xl font-semibold text-center">
                    {headerTitle}
                  </p>
                )}
                <Box
                  width={36}
                  height={36}
                  rounded
                  handleClick={closeModal}
                  className="absolute top-3 right-3 cursor-pointer pb-1 text-xl font-bold 
                    bg-gray-100 text-gray-500"
                >
                  &times;
                </Box>
              </div>
            </Parent>
          )}
          <div className="p-3">{children}</div>
          {footerButton && footerButton.length > 0 && (
            <div className="p-3 w-full border-t border-solid border-gray-300 flex justify-end">
              <div>
                {footerButton &&
                  footerButton.map((item) => (
                    <Button
                      key={item.id}
                      handleClick={item.handle}
                      mode={item.type === "close" ? "gray" : "primary"}
                    >
                      {item.name}
                    </Button>
                  ))}
              </div>
            </div>
          )}
        </div>
      </Parent>
    </Portal>
  );
};

export default Modal;
