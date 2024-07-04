import { useContext, useState } from "react";
import Button from "../../../../components/Button";
import Modal from "../../../../components/Modal";
import { ChatGPTContext } from "../../../../contexts/ChatGPTContext/ChatGPTContext";
import { updateData } from "../../../../contexts/ChatGPTContext/Actions";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const ModalConfirmDeletion = ({ closeModal }: { closeModal: Function }) => {
  //
  const { dispatch } = useContext(ChatGPTContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth0();
  const handleDelete = async () => {
    setLoading(true);
    await fetch(
      `${
        process.env.REACT_APP_BASE_URL
      }/api/chat-gpt/history/delete/all?userId=${(
        user?.nickname || ""
      ).replaceAll(".", "-")}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(updateData({ key: "historyList", value: [] }));
    dispatch(updateData({ key: "current", value: null }));
    closeModal();
    navigate(`/chat-gpt`);
    return;
  };
  //
  return (
    <Modal closeModal={closeModal} noAnimate loading={loading}>
      <p className="text-xl font-semibold mb-2 pt-5">
        Clear your chat history - are you sure?
      </p>
      <p className="text-gray-500 text-sm">
        To clear any memories from your chats, visit your{" "}
        <span className="underline">settings</span>.
      </p>
      <div className="pt-2 mt-5 flex justify-end gap-3">
        <Button onClick={() => closeModal()} mode="gray" rounded="full">
          Cancel
        </Button>
        <Button onClick={handleDelete} mode="delete" rounded="full">
          Confirm deletion
        </Button>
      </div>
    </Modal>
  );
};

export default ModalConfirmDeletion;
