import { useNavigate, useParams } from "react-router-dom";
import StartSearch from "../StartSearch";
import { useContext, useEffect } from "react";
import { ChatGPTContext } from "../../../../contexts/ChatGPTContext/ChatGPTContext";
import { updateData } from "../../../../contexts/ChatGPTContext/Actions";
import Button from "../../../../components/Button";

const ShareHistory = () => {
  //
  const {
    app: { current },
    dispatch,
  } = useContext(ChatGPTContext);
  const { historyId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/chat-gpt/history/share?historyId=${historyId}`
      ).then((res) => res.json());
      dispatch(updateData({ key: "current", value: result }));
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historyId]);
  //
  return (
    <div className="w-full h-screen flex-col">
      <div className="mx-auto flex-1 pb-32 relative" style={{ maxWidth: 768 }}>
        <p className="text-4xl py-3 font-bold">{current?.name}</p>
        <p className="py-2 text-gray-500 text-sm">{current?.timeSaved}</p>
        <div className="p-4 rounded-lg flex items-center gap-4 bg-gray-200 bg-opacity-50 opacity-80">
          <span className="bx bx-info-circle text-2xl opacity-80"></span>
          <p className="text-justify">
            This conversation may reflect the link creator’s personalized data,
            which isn’t shared and can meaningfully change how the model
            responds.
          </p>
        </div>
        <hr className="my-5" />
        <StartSearch isShare />
        <div className="fixed bg-white bottom-0 left-0 w-full pt-4">
          <div
            className="flex justify-center flex-col mx-auto"
            style={{ maxWidth: 768 }}
          >
            <div className="mx-auto">
              <Button
                onClick={() => {
                  dispatch(
                    updateData({
                      key: "current",
                      value: null,
                    })
                  );
                  navigate(`/chat-gpt`);
                }}
                mode="text"
                rounded="full"
                className="bg-black text-white"
                height={45}
              >
                Get started with ChatGPT
              </Button>
            </div>
            <ul className="mx-auto text-xs mt-2 text-gray-500 py-2 flex items-center gap-3">
              <li className="cursor-pointer hover:underline text-gray-600">
                Report content
              </li>
              <li className="cursor-pointer hover:underline text-gray-600">
                Terms of use
              </li>
              <li className="cursor-pointer hover:underline text-gray-600">
                Privacy policy
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareHistory;
