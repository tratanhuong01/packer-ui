import { useContext } from "react";
import { Model } from "./type";
import { TableContext } from "./TableContext";

export type ModalCommonParam = {
  limit: number;
  ModalContainer: any;
};

export type ModalCommonProps<T> = {
  submitForm: (data: T) => void;
  closeModal: () => void;
  showLoading: () => void;
  hideLoading: () => void;
  id: string;
  loadingModal: boolean;
};

const ModalCommon = <T,>({ limit, ModalContainer }: ModalCommonParam) => {
  const {
    custom: { list, length, show, idEdit, loadingModal },
    dispatch,
    actions: { updateData },
  } = useContext(TableContext);
  const handleSubmit = async (result: Model<T>) => {
    dispatch(updateData("loadingModal", true));
    dispatch(updateData("idEdit", ""));
    const index = list.findIndex((item: Model<T>) => item.id === result.id);
    if (index === -1) {
      dispatch(updateData("length", length + 1));
      dispatch(
        updateData(
          "list",
          limit ? [result, ...list].slice(0, limit) : [result, ...list]
        )
      );
    } else {
      let newData = [...list];
      newData[index] = result;
      dispatch(updateData("list", newData));
    }
    dispatch(updateData("show", false));
    dispatch(updateData("loadingModal", false));
    dispatch(updateData("idEdit", ""));
  };
  const modalProps = {
    submitForm: handleSubmit,
    closeModal: () => {
      dispatch(updateData("show", false));
      dispatch(updateData("idEdit", ""));
    },
    limit,
    showLoading: () => dispatch(updateData("loadingModal", true)),
    hideLoading: () => dispatch(updateData("loadingModal", false)),
    id: idEdit,
    loadingModal,
  };
  return <div>{show ? <ModalContainer {...modalProps} /> : <></>}</div>;
};

export default ModalCommon;
