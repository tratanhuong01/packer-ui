import { useContext, useState } from "react";
import Modal from "../../../../components/Modal";
import { ChatGPTContext } from "../../../../contexts/ChatGPTContext/ChatGPTContext";
import { updateData } from "../../../../contexts/ChatGPTContext/Actions";
import { HistoryProps } from "../../interfaces/Message";
import { saveHistory } from "../../api";
import { useNavigate } from "react-router-dom";
import ModalDelete from "../ModalDelete";
import { formatDate } from "../../utils";
import { useAuth0 } from "@auth0/auth0-react";

const ModalArchivedChat = ({ closeModal }: { closeModal: Function }) => {
  //
  const {
    app: { historyList },
    dispatch,
  } = useContext(ChatGPTContext);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth0();
  const handleUnArchive = async (history: HistoryProps) => {
    if (loading) return;

    setLoading(true);
    let temp = { ...history };
    temp.messages = temp.messages?.map((item) => {
      item.list = (item.list || []).map((val) => {
        val.contentSearch = val.contentSearch || "";
        return val;
      });
      return item;
    });
    await saveHistory({
      history: {
        ...temp,
        isArchive: !temp.isArchive,
        timeSaved: new Date(),
      },
      userId: (user?.nickname || "").replaceAll(".", "-"),
    });
    dispatch(
      updateData({
        key: "historyList",
        value: [...historyList].map((val) => {
          if (val.id === history.id) {
            val.isArchive = !val.isArchive;
          }
          return val;
        }),
      })
    );
    setLoading(false);
  };
  const navigate = useNavigate();
  const [modal, setModal] = useState<any>();
  //
  return (
    <Modal
      width={850}
      headerTitle="Archived Chats"
      closeModal={closeModal}
      noAnimate
      loading={loading}
    >
      <div className="text-sm -mt-4">
        <div className="flex items-center font-semibold py-2 border-b border-solid border-gray-200 text-gray-600">
          <div className="flex-1">Name</div>
          <div className="w-48">Date created</div>
          <div className="px-5 flex gap-2 text-gray-400 items-center w-16"></div>
        </div>
        {historyList
          .filter((item) => item.isArchive)
          .map((item) => {
            return (
              <div
                key={item.id}
                className="flex items-center py-2 border-b border-solid border-gray-200"
              >
                <div
                  onClick={() => {
                    closeModal();
                    navigate(`/chat-gpt/${item.id}`);
                  }}
                  className="flex gap-2 flex-1 text-primary items-center cursor-pointer"
                >
                  <span className="bx bx-comment"></span>
                  <span className="flex-1">{item.name}</span>
                </div>
                <div className="w-48 text-gray-500">
                  {formatDate(new Date(item.timeSaved))}
                </div>
                <div className="px-5 flex gap-2 text-gray-400 items-center w-16">
                  <i
                    onClick={() => handleUnArchive(item)}
                    className="bx bx-archive-in cursor-pointer"
                  ></i>
                  <i
                    onClick={() =>
                      setModal(
                        <ModalDelete
                          history={item}
                          closeModal={() => setModal("")}
                          handleDelete={async () => {
                            await fetch(
                              `${
                                process.env.REACT_APP_BASE_URL
                              }/api/chat-gpt/history/delete?userId=${(
                                user?.nickname || ""
                              ).replaceAll(".", "-")}&historyId=${item.id}`,
                              {
                                method: "DELETE",
                              }
                            ).then((res) => res.json());
                            dispatch(
                              updateData({
                                key: "historyList",
                                value: historyList.filter(
                                  (val) => item.id !== val.id
                                ),
                              })
                            );
                          }}
                        />
                      )
                    }
                    className="bx bx-trash cursor-pointer"
                  ></i>
                </div>
              </div>
            );
          })}
        {historyList.filter((item) => item.isArchive).length === 0 && (
          <p className="pt-6 pb-3 text-gray-500">
            You have no archived conversations.
          </p>
        )}
        {modal}
      </div>
    </Modal>
  );
};

export default ModalArchivedChat;
