import Modal from "../../../../components/Modal";

const ModalArchivedChat = ({ closeModal }: { closeModal: Function }) => {
  return (
    <Modal
      width={850}
      headerTitle="Archived Chats"
      closeModal={closeModal}
      noAnimate
    >
      <div className="text-sm">
        <div className="flex items-center font-semibold py-2 border-b border-solid border-gray-200 text-gray-600">
          <div className="flex-1">Name</div>
          <div className="w-48">Date created</div>
          <div className="px-5 flex gap-2 text-gray-400 items-center w-16"></div>
        </div>
        {[1, 2, 3, 4, 5, 6].map((item) => {
          return (
            <div
              key={item}
              className="flex items-center py-2 border-b border-solid border-gray-200"
            >
              <div className="flex gap-2 flex-1 text-primary items-center cursor-pointer">
                <span className="bx bx-comment"></span>
                <span className="flex-1">Event Stream React Fetch</span>
              </div>
              <div className="w-48 text-gray-500">June 28, 2024</div>
              <div className="px-5 flex gap-2 text-gray-400 items-center w-16">
                <i className="bx bx-archive-in"></i>
                <i className="bx bx-trash"></i>
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default ModalArchivedChat;
