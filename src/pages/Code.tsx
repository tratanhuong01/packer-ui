import { useState } from "react";
import Toast from "../components/Toast";
import Wrapper from "./Wrapper";
import Button from "../components/Button";

const Code = () => {
  //
  const [toasts, setToasts] = useState<number[]>([]);
  //
  return (
    <div className="w-full overflow-hidden h-screen">
      <Wrapper notFound hideContentRight>
        <div className="flex flex-col gap-3">
          {toasts.map((item) => (
            <Toast
              key={item}
              id={item}
              content={{
                title: "Success",
                description: "Add success.",
              }}
              removeToast={(id: any) => {
                setToasts([...toasts].filter((val) => val !== id));
              }}
              severity="success"
            />
          ))}
        </div>
        <Button
          mode="outlined"
          onClick={() => setToasts([...toasts, Math.random()])}
        >
          Add toast
        </Button>
      </Wrapper>
    </div>
  );
};

export default Code;
