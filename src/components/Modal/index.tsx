import { createPortal } from "react-dom";
import "./index.scss";
import { ModalProps, ModalPortalProps } from "./type";
import Button from "../Button";
import { useEffect, useState } from "react";

const Portal = ({ children }: ModalPortalProps) => {
  //
  const modalRoot = document.getElementById("modal-root");
  return createPortal(children, modalRoot || document.body);
};

const Modal = ({
  children,
  width,
  headerTitle,
  closeModal,
  footerButton,
  footerButtonRender,
  loading,
  submitForm,
  mode,
  disabledCenter,
  disableSubmitForm,
  noPadding,
  noAnimate,
  invisible,
}: ModalProps) => {
  //
  const [footerButtonI, setFooterButtonI] = useState(footerButton);
  useEffect(() => {
    setFooterButtonI(footerButton);
  }, [footerButton]);
  //
  return (
    <Portal>
      <div
        onClick={() => closeModal && closeModal()}
        className="fixed top-0 left-0 bottom-0 right-0 bg-opacity-70 z-30 bg-black"
        style={{ zIndex: 9999999 }}
      />
      <div
        className={`w-full flex ${
          disabledCenter ? "overflow-y-scroll" : "items-center overflow-hidden"
        } justify-center fixed h-screen ${
          noAnimate ? "" : mode === "panel" ? "showIn" : "zoomIn"
        } z-30 top-0 left-0 ${invisible ? "hidden" : ""}`}
        style={{ zIndex: 9999999 }}
      >
        <form
          onSubmit={
            !disableSubmitForm && submitForm
              ? submitForm
              : (e: any) => {
                  e.preventDefault();
                  submitForm && submitForm();
                }
          }
          className={`w-full bg-white relative flex flex-col ${
            mode === "panel" ? "h-full ml-auto" : "rounded-lg overflow-hidden"
          } ${disabledCenter ? "h-max my-20" : ""}`}
          style={{ width: `${mode === "panel" ? 600 : width || 450}px` }}
        >
          {headerTitle && (
            <div
              className={`flex items-center justify-center p-5 ${
                noPadding ? "" : "p-5"
              }`}
            >
              <div
                className={`w-full flex items-center ${
                  headerTitle ? "border-b border-solid border-gray-200" : ""
                } relative`}
              >
                {headerTitle && (
                  <p className="font-semibold pb-4 text-left">{headerTitle}</p>
                )}
                <div
                  onClick={() => closeModal && closeModal()}
                  className="w-9 h-9 flex items-center justify-center absolute -top-2 right-0 cursor-pointer pb-1 text-xl font-bold 
                    bg-gray-100 text-gray-500 z-30"
                >
                  &times;
                </div>
              </div>
            </div>
          )}
          <div
            className={`${noPadding ? "" : "pl-5 pr-5 pb-5 "}bg-white ${
              mode === "panel" ? "flex-1" : ""
            }`.trim()}
          >
            {children}
          </div>
          {footerButtonRender
            ? footerButtonRender
            : footerButtonI &&
              footerButtonI.length > 0 && (
                <div className="px-5">
                  <div className="py-3 w-full border-t border-solid border-gray-300 flex justify-end items-center gap-3">
                    {footerButtonI &&
                      footerButtonI.map((item) => (
                        <Button
                          type={item.type === "confirm" ? "submit" : "button"}
                          key={item.id}
                          handleClick={item.handle}
                          mode={
                            item.customMode ||
                            (item.type === "close"
                              ? "gray"
                              : item.type === "confirm"
                              ? "primary"
                              : "outlined")
                          }
                          disabled={item.disabled}
                          loading={item.loading}
                          {...(item.props || {})}
                        >
                          {item.name}
                        </Button>
                      ))}
                  </div>
                </div>
              )}
          {loading && (
            <div
              className="w-full top-0 left-0 right-0 bottom-0 bg-white bg-opacity-50 absolute 
            flex items-center justify-center"
            >
              <i className="bx bx-loader-alt text-primary text-4xl animate-spin" />
            </div>
          )}
        </form>
      </div>
    </Portal>
  );
};

export { Portal };

export default Modal;
