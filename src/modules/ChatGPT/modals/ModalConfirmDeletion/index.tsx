import Button from "../../../../components/Button";
import Modal from "../../../../components/Modal";

const ModalConfirmDeletion = ({ closeModal }: { closeModal: Function }) => {
  return (
    <Modal closeModal={closeModal} noAnimate>
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
        <Button mode="delete" rounded="full">
          Confirm deletion
        </Button>
      </div>
    </Modal>
  );
};

export default ModalConfirmDeletion;
