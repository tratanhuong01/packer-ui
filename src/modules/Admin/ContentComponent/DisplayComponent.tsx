import { useContext, useState } from "react";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import { AdminContext } from "../../../contexts/AdminContext/AdminContext";
import Input from "../../../components/Input";
import { DisplayComponentProps } from "./type";

const DisplayComponent = ({
  closeModal,
  index,
  handleSubmit,
}: DisplayComponentProps) => {
  //
  const {
    admin: {
      content,
      props: { component },
    },
  } = useContext(AdminContext);
  const [collapse, setCollapse] = useState("");
  const [expand, setExpand] = useState("");
  const handleSave = () => {
    const indexFind = content.findIndex((item) => item.id === index);
    if (indexFind !== -1) {
      const newContent = [...content];

      newContent[indexFind].component.code.collapse = collapse;
      newContent[indexFind].component.code.expand = expand;
    }
    handleSubmit();
  };
  //
  return (
    <Modal
      headerTitle="Component"
      closeModal={closeModal}
      footerButtonRender={
        <div className="flex justify-end p-2">
          <Button mode="primary" handleClick={handleSave}>
            Save
          </Button>
        </div>
      }
    >
      {component.map((item) => (
        <div key={item.id} className="flex items-center mb-2 gap-3">
          <span>{item.dataType.type}</span>
          <Input type="text" />
        </div>
      ))}
      <div className="p-2 overflow-y-scroll h-80">
        <p>Collapse code</p>
        <textarea
          defaultValue={collapse}
          className="w-full h-48 bg-gray-500 text-white p-2 rounded-sm"
          spellCheck={false}
          name="collapse"
          onChange={(e) => setCollapse(e.target.value)}
        ></textarea>
        <p>Expand code</p>
        <textarea
          defaultValue={expand}
          name="expand"
          className="w-full h-48 bg-gray-500 text-white p-2 rounded-sm"
          spellCheck={false}
          onChange={(e) => setExpand(e.target.value)}
        ></textarea>
      </div>
    </Modal>
  );
};

export default DisplayComponent;
