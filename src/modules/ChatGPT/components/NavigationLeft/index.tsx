import { useContext } from "react";
import Box from "../../../../components/Box";
import Parent from "../../../../components/Parent";
import ItemResultSearch from "../ItemResultSearch";
import { ChatGPTContext } from "../../../../contexts/ChatGPTContext/ChatGPTContext";
import Button from "../../../../components/Button";
import { useAuth0 } from "@auth0/auth0-react";

const NavigationLeft = () => {
  //
  const { isAuthenticated } = useAuth0();
  const {
    app: { historyList, fullScreen },
    dispatch,
    actions: { updateData },
  } = useContext(ChatGPTContext);
  const box =
    "w-10 h-10 hover:bg-gray-200 cursor-pointer text-xl flex justify-center items-center rounded-lg";
  const { loginWithPopup, user } = useAuth0();
  console.log(user);
  //
  return fullScreen ? (
    <Parent className="w-72 flex flex-col py-2 px-3 bg-gray-100 bg-opacity-50">
      <div className="flex items-center justify-between">
        <div
          onClick={() => {
            dispatch(updateData({ key: "fullScreen", value: false }));
          }}
          className={`${box}`}
        >
          <i className="bx bx-dock-left"></i>
        </div>
        <div
          onClick={() => {
            dispatch(updateData({ key: "current", value: null }));
          }}
          className={`${box}`}
        >
          <i className="bx bx-edit"></i>
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex-1 pt-8">
          <p className="text-xs font-bold mb-2 text-gray-500">Today</p>
          {historyList.map((item) => (
            <ItemResultSearch
              key={item.id}
              history={item}
              handleRemove={() => {
                dispatch(updateData({ key: "current", value: null }));
                dispatch(
                  updateData({
                    key: "historyList",
                    value: historyList.filter((val) => item.id !== val.id),
                  })
                );
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
