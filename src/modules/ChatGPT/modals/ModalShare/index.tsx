import { useState } from "react";
import Button from "../../../../components/Button";
import Modal from "../../../../components/Modal";
import useCopyText from "../../../../hooks/useCopyText";

const ModalShare = ({ closeModal }: { closeModal: Function }) => {
  //
  const [success, setSuccess] = useState(false);
  const [value, setValue] = useState("");
  const { handleClick, loading } = useCopyText(
    "https://chatgpt.com/share/fb418923-60cc-47ed-93e9-f1e064ddb8db",
    () => {
      setSuccess(true);
      setValue(
        "https://chatgpt.com/share/fb418923-60cc-47ed-93e9-f1e064ddb8db"
      );
    }
  );
  //
  return (
    <Modal
      width={500}
      headerTitle="Share public link to chat"
      closeModal={closeModal}
    >
      <p className="text-gray-500 mb-2">
        Your name, custom instructions, and any messages you add after sharing
        stay private. Learn more
      </p>
      <div className="flex py-4 gap-2">
        <input type="checkbox" onChange={() => ""} checked />
        <div className="flex flex-col gap-0">
          <p className="leading-5">Make this chat discoverable</p>
          <p className="text-gray-500 text-xs leading-3">
            Allows it to be shown in web searches
          </p>
        </div>
      </div>
      <div
        className="w-full p-2 rounded-full border border-gray-300 px-4 mb-2 mt-4 border-solid flex items-center 
      gap-3"
      >
        <input
          type="text"
          value={value}
          disabled={true}
          className="flex-1 text-gray-500"
          placeholder="https://chatgpt.com/share/..."
        />
        <Button
          width={130}
          onClick={() => {
            handleClick();
          }}
          className="rounded-full bg-black text-white"
        >
          <div className="flex items-center gap-2">
            {loading ? (
              <i className="bx bx-loader-circle animate-spin"></i>
            ) : (
              <i className="bx bx-copy"></i>
            )}

            <span>
              {loading ? "Copying" : !success ? "Create link" : "Copied"}
            </span>
          </div>
        </Button>
      </div>
    </Modal>
  );
};

export default ModalShare;
