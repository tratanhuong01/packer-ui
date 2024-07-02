import { useState } from "react";
import Modal from "../../../../components/Modal";
import { HistoryProps } from "../../interfaces/Message";

const ModalDelete = ({
  closeModal,
  handleDelete,
  history,
}: {
  closeModal: Function;
  handleDelete: Function;
  history: HistoryProps;
}) => {
  const [loading, setLoading] = useState(false);
  return (
    <Modal
      loading={loading}
      width={500}
      headerTitle="Delete chat?"
      closeModal={closeModal}
      footerButton={[
        {
          id: Math.random(),
          name: "Cancel",
          type: "close",
          handle: closeModal,
          props: { rounded: "full", children: "Cancel" },
        },
        {
          id: Math.random(),
          name: "Delete",
          type: "confirm",
          customMode: "delete",
          handle: async () => {
            setLoading(true);
            await handleDelete();
            closeModal();
          },
          props: { rounded: "full", children: "Delete" },
        },
      ]}
    >
      <p className="pt-2">
        This will delete Title: <b>{history.name}</b>
      </p>
      <p className="text-gray-400 py-2">
        To clear any memories from this chat, visit your{" "}
        <span className="underline">settings</span>.
      </p>
    </Modal>
  );
};

export default ModalDelete;
