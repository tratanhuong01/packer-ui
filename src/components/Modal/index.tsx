import { ReactNode } from "react";
import { createPortal } from "react-dom";
import "./index.scss";
import Overlay from "../Overlay";
import ModalProps from "./type";
import Parent from "../Parent";
import Box from "../Box";
import Button from "../Button";
import useClickOutside from "../../hooks/useClickOutside";

const Portal = ({
  children,
  childrenModal,
}: {
  children?: ReactNode;
  childrenModal?: string;
}) => {
  //
  const modalRoot = document.getElementById(
    childrenModal ? "children-modal-root" : "modal-root"
  );
  return createPortal(children, modalRoot || document.body);
};

const Modal = (props: ModalProps) => {
  //
  const {
    children,
    width,
    headerTitle,
    closeModal,
    footerButton,
    footerButtonRender,
    childrenModal,
  } = props;
  const refContent = useClickOutside({
    handleClick: (bool) => {
      bool && closeModal && closeModal();
    },
    status: false,
  });
  //
  return (
    <Portal childrenModal={childrenModal}>
      <Overlay isPosition={childrenModal ? "absolute" : "fixed"} />
      <Parent
        justify="center"
        items="center"
        className={`w-full ${
          childrenModal
            ? "absolute right-0 bottom-0"
            : "fixed h-screen zoomIn z-30"
        } top-0 left-0 `}
      >
        <div
          ref={refContent.ref}
          className="w-full bg-white rounded-sm"
          style={{ width: `${width || 600}px` }}
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
          {footerButtonRender
            ? footerButtonRender
            : footerButton &&
              footerButton.length > 0 && (
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
