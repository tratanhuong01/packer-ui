import { useEffect, useState } from "react";
import Input from "../../../../components/Input";
import Modal from "../../../../components/Modal";
import { addComponent, getComponentById, updateComponent } from "../../apis";
import { ModalCommonProps } from "../../../../components/Table/ModalCommon";

const ModalAddComponent = ({
  closeModal,
  showLoading,
  hideLoading,
  id,
  submitForm,
  loadingModal,
}: ModalCommonProps<any>) => {
  //
  const [value, setValue] = useState("");
  const [comp, setComp] = useState<any>();
  const handleSubmit = async () => {
    showLoading();
    let result;
    if (!id) {
      result = await addComponent({
        id: Math.random(),
        name: value,
        type: "app",
        contents: [],
        props: [],
      }).then((res) => res.json());
    } else {
      if (!comp) return;
      result = { ...comp, name: value };
      if (!comp.contents) result = { ...result, contents: [] };
      if (!comp.props) result = { ...result, props: [] };
      await updateComponent(result);
    }
    submitForm && submitForm(result);
    hideLoading();
  };
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const result = await getComponentById(Number(id)).then((res) =>
        res.json()
      );
      setComp(result);
      setValue(result?.name);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  //
  return (
    <Modal
      width={500}
      submitForm={handleSubmit}
      loading={loadingModal}
      headerTitle={`${id ? "Update" : "Add"} component`}
      closeModal={closeModal}
      footerButton={[
        {
          name: !id ? "Add" : "Update",
          type: "confirm",
          id: 1,
          handle: () => "",
        },
      ]}
    >
      <div className="p-5">
        <Input
          type="text"
          placeholder="Name component"
          className="w-full"
          value={value}
          handleChange={(e) => setValue(e)}
          spellcheck={false}
        />
      </div>
    </Modal>
  );
};
export default ModalAddComponent;
