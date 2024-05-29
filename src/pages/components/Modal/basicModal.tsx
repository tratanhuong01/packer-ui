import { useState } from "react";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";

const BasicModal = () => {
  //
  const [showModal, setShowModal] = useState(false);
  //
  return (
    <>
      <Button mode="outlined" onClick={() => setShowModal(true)}>
        Open Modal
      </Button>
      {showModal && (
        <Modal headerTitle="Modal" closeModal={() => setShowModal(false)}>
          Content modal here
        </Modal>
      )}
    </>
  );
};

const basicModalExpand = `import { useState } from "react";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";

const BasicModal = () => {
  //
  const [showModal, setShowModal] = useState(false);
  //
  return (
    <>
      <Button mode="outlined" onClick={() => setShowModal(true)}>
        Open Modal
      </Button>
      {showModal && (
        <Modal headerTitle="Modal" closeModal={() => setShowModal(false)}>
          Content modal here
        </Modal>
      )}
    </>
  );
};

export default BasicModal;`;

const basicModalCollapse = `<>
<Modal mode="outlined" onClick={() => setShowModal(true)}>
  Open Modal
</Modal>
{showModal && (
  <Modal headerTitle="Modal" closeModal={() => setShowModal(false)}>
    Content modal here
  </Modal>
)}
</>`;

export { BasicModal, basicModalCollapse, basicModalExpand };
