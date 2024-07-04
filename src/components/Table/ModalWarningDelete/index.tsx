import { useContext } from "react";
import Modal from "../../Modal";
import { TableContext } from "../TableContext";

const ModalWarningDelete = ({
  closeModal,
  deleteAPI,
  fetchData,
}: {
  closeModal: Function;
  fetchData: Function;
  deleteAPI?: (ids: number[]) => void;
}) => {
  const {
    custom: { selected, length, list, index, loadingModal },
    dispatch,
    actions: { updateData },
  } = useContext(TableContext);
  const handleDelete = async () => {
    dispatch(updateData("loadingModal", true));
    const ids = selected.map((item) => item.id || 0);
    deleteAPI && (await deleteAPI(ids));
    if (list.length === selected.length) {
      dispatch(updateData("index", index - 1 < 0 ? 0 : index - 1));
    }
    dispatch(
      updateData(
        "list",
        list.filter((item) => {
          const index = selected.findIndex((select) => select.id === item.id);
          return index === -1;
        })
      )
    );
    dispatch(updateData("selected", []));
    dispatch(updateData("length", length - ids.length));
    await fetchData();
    dispatch(updateData("loadingModal", false));
    dispatch(updateData("warningDelete", false));
  };
  return (
    <Modal
      headerTitle="Delete"
      submitForm={handleDelete}
      disableSubmitForm
      closeModal={closeModal}
      footerButton={[
        {
          name: "Cancel",
          type: "other",
          id: Math.random(),
          handle: () => closeModal(),
        },
        {
          name: "save",
          type: "confirm",
          id: Math.random(),
        },
      ]}
      loading={loadingModal}
    >
      Do you want delete all selected.
    </Modal>
  );
};

export default ModalWarningDelete;
