import { useState } from "react";
import Modal from "../../../../components/Modal";

const ModalDelete = ({
  closeModal,
  handleDelete,
}: {
  closeModal: Function;
  handleDelete: Function;
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
        },
        {
          id: Math.random(),
          name: "Delete",
          type: "confirm",
          customMode: "delete",
          handle: async () => {
            setLoading(true);
            await handleDelete();
          },
        },
      ]}
    >
      <p className="pt-2">
        This will delete Title: <b>User request</b> <b>,assistant response.</b>
      </p>
      <p className="text-gray-400 py-2">
        To clear any memories from this chat, visit your{" "}
        <span className="underline">settings</span>.
      </p>
    </Modal>
  );
};

export default ModalDelete;
