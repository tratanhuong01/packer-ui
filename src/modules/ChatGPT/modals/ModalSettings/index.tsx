import Modal from "../../../../components/Modal";

const ModalSettings = ({ closeModal }: { closeModal: Function }) => {
  return (
    <Modal width={500} headerTitle="Settings" closeModal={closeModal}></Modal>
  );
};

export default ModalSettings;
