import { useState } from "react";
import Button from "../../../../components/Button";
import Modal from "../../../../components/Modal";
import ModalConfirmDeletion from "../ModalConfirmDeletion";
import ModalConfirmArchivedChat from "../ModalConfirmArchivedChat";
import ModalArchivedChat from "../ModalArchivedChat";
import { useNavigate } from "react-router-dom";

const ModalSettings = ({ closeModal }: { closeModal: Function }) => {
  //
  const [modal, setModal] = useState<any>("");
  const navigate = useNavigate();
  //
  return (
    <>
      {!modal && (
        <Modal
          width={768}
          headerTitle="Settings"
          closeModal={closeModal}
          noAnimate
        >
          <div
            className="py-3 border-b border-solid border-gray-200 flex items-center mb-1 
            justify-between text-sm"
          >
            <span>Theme</span>
            <div className="flex items-center gap-2 cursor-pointer">
              <span>Light</span>
              <span className="bx bx-chevron-down"></span>
            </div>
          </div>
          <div
            className="py-3 border-b border-solid border-gray-200 flex items-center mb-1 
            justify-between text-sm"
          >
            <span>Always show code when using data analyst</span>
            <input type="checkbox" />
          </div>
          <div
            className="py-3 border-b border-solid border-gray-200 flex items-center mb-1 
            justify-between text-sm"
          >
            <span>Language</span>
            <div className="flex items-center gap-2 cursor-pointer">
              <span>Auto-detect</span>
              <span className="bx bx-chevron-down"></span>
            </div>
          </div>
          <div
            className="py-3 border-b border-solid border-gray-200 flex items-center mb-1 
            justify-between text-sm"
          >
            <span>Archived chats</span>
            <Button
              onClick={() =>
                setModal(<ModalArchivedChat closeModal={() => setModal("")} />)
              }
              mode="outlined"
              rounded="full"
            >
              Manage
            </Button>
          </div>
          <div
            className="py-3 border-b border-solid border-gray-200 flex items-center mb-1 
            justify-between text-sm"
          >
            <span>Archived all chats</span>
            <Button
              onClick={() =>
                setModal(
                  <ModalConfirmArchivedChat
                    closeModal={() => {
                      closeModal();
                      navigate("/chat-gpt");
                    }}
                  />
                )
              }
              rounded="full"
              mode="outlined"
            >
              Archived all
            </Button>
          </div>
          <div
            className="py-3 border-b border-solid border-gray-200 flex items-center mb-1 
            justify-between text-sm"
          >
            <span>Archived chats</span>
            <Button
              rounded="full"
              onClick={() =>
                setModal(<ModalConfirmDeletion closeModal={closeModal} />)
              }
              mode="delete"
            >
              Delete all
            </Button>
          </div>
        </Modal>
      )}
      {modal}
    </>
  );
};

export default ModalSettings;
