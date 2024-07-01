import Button from "../../../../components/Button";
import Modal from "../../../../components/Modal";

const ModalConfirmArchivedChat = ({ closeModal }: { closeModal: Function }) => {
  return (
    <Modal closeModal={closeModal} noAnimate>
      <p className="font-semibold text-xl mt-6">
        Archive your chat history - are you sure?
      </p>
      <div className="pt-2 mt-5 flex justify-end gap-3">
        <Button onClick={() => closeModal()} mode="outlined" rounded="full">
          Cancel
        </Button>
        <Button className="bg-black text-white" rounded="full">
          Confirm archive
        </Button>
      </div>
    </Modal>
  );
};

export default ModalConfirmArchivedChat;
