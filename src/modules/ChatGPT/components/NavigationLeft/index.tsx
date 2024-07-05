import { useContext } from "react";
import Box from "../../../../components/Box";
import Parent from "../../../../components/Parent";
import ItemResultSearch from "../ItemResultSearch";
import { ChatGPTContext } from "../../../../contexts/ChatGPTContext/ChatGPTContext";
import Button from "../../../../components/Button";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const NavigationLeft = () => {
  //
  const { isAuthenticated } = useAuth0();
  const {
    app: { historyList, fullScreen, current },
    dispatch,
    actions: { updateData },
  } = useContext(ChatGPTContext);
  const { user } = useAuth0();
  const box =
    "w-10 h-10 hover:bg-gray-200 cursor-pointer text-xl flex justify-center items-center rounded-lg";
  const { loginWithPopup } = useAuth0();
  const navigate = useNavigate();
  //
  return !fullScreen ? (
    <Parent className="w-72 flex flex-col py-2 px-3 bg-gray-100 bg-opacity-50">
      <div className="flex items-center justify-between">
        <div
          onClick={() => {
            dispatch(updateData({ key: "fullScreen", value: true }));
          }}
          className={`${box}`}
        >
          <i className="bx bx-dock-left"></i>
        </div>
        <div
          onClick={() => {
            dispatch(updateData({ key: "current", value: null }));
            navigate(`/chat-gpt`);
          }}
          className={`${box}`}
        >
          <i className="bx bx-edit"></i>
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex-1 pt-8 flex flex-col gap-1">
          <p className="text-xs font-bold mb-2 text-gray-500">Today</p>
          {historyList
            .filter((item) => !item.isArchive)
            .map((item) => (
              <ItemResultSearch
                key={item.id}
                history={item}
                handleRemove={async () => {
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
                      key: "current",
                      value: current?.id === item.id ? null : current,
                    })
                  );
                  dispatch(
                    updateData({
                      key: "historyList",
                      value: historyList.filter((val) => item.id !== val.id),
                    })
                  );
                  if (item.id === current?.id) {
                    navigate(`/chat-gpt`);
                  }
                }}
              />
            ))}
        </div>
        <div className="">
          {isAuthenticated ? (
            <div className="flex items-center gap-2 hover:bg-gray-100 cursor-pointer p-2">
              <Box width={30} height={30} rounded>
                <i className="bx bx-star"></i>
              </Box>
              <div>
                <p className="font-semibold">Upgrade plan</p>
                <p className="text-xs">Get PUI-4, DALLE, and more</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="font-semibold">Sign up or log in</p>
              <p className="text-gray-500">
                Get smarter responses, upload files and images, and more.
              </p>
              <Button
                onClick={() => {
                  loginWithPopup();
                }}
                mode="primary"
              >
                Sign up
              </Button>
              <Button
                onClick={() => {
                  dispatch(updateData({ key: "current", value: null }));
                  loginWithPopup();
                }}
                mode="outlined"
              >
                Log in
              </Button>
            </div>
          )}
        </div>
      </div>
    </Parent>
  ) : (
    <></>
  );
};

export default NavigationLeft;
