import { useContext, useState } from "react";
import Button from "../../../../components/Button";
import Modal from "../../../../components/Modal";
import { ChatGPTContext } from "../../../../contexts/ChatGPTContext/ChatGPTContext";
import { updateData } from "../../../../contexts/ChatGPTContext/Actions";
import { useAuth0 } from "@auth0/auth0-react";

const ModalConfirmArchivedChat = ({ closeModal }: { closeModal: Function }) => {
  //
  const [loading, setLoading] = useState(false);
  const {
    app: { historyList },
    dispatch,
  } = useContext(ChatGPTContext);
  const { user } = useAuth0();
  //
  return (
    <Modal closeModal={closeModal} noAnimate loading={loading}>
      <p className="font-semibold text-lg mt-6">
        Archive your chat history - are you sure?
      </p>
      <div className="pt-2 mt-5 flex justify-end gap-3">
        <Button onClick={() => closeModal()} mode="outlined" rounded="full">
          Cancel
        </Button>
        <Button
          onClick={async () => {
            setLoading(true);
            await fetch(
              `${
                process.env.REACT_APP_BASE_URL
              }/api/chat-gpt/history/list?userId=${(
                user?.nickname || ""
              ).replaceAll(".", "-")}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            dispatch(
              updateData({
                key: "historyList",
                value: historyList.map((item) => {
                  return {
                    ...item,
                    isArchive: true,
                    timeSaved: new Date().toString(),
                  };
                }),
              })
            );
            dispatch(updateData({ key: "current", value: null }));
            closeModal();
          }}
          className="bg-black text-white"
          rounded="full"
        >
          Confirm archive
        </Button>
      </div>
    </Modal>
  );
};

export default ModalConfirmArchivedChat;
