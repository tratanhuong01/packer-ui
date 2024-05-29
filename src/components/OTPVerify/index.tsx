import { createRef, useEffect, useState } from "react";

const OTPVerify = () => {
  //
  const [inputs, setInputs] = useState<
    {
      value: "" | number;
      key: number;
      error: boolean;
    }[]
  >(
    [-1, -1, -1, -1, -1, -1].map((item) => {
      return {
        value: "",
        key: Math.random(),
        error: false,
      };
    })
  );
  const refs = [1, 2, 3, 4, 5, 6].map((item) => createRef<HTMLInputElement>());
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    if ("123456" === inputs.map((item) => item.value).join("")) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  }, [inputs]);
  //
  return (
    <div
      className="border border-solid border-gray-200 shadow-md px-12 py-24 text-center 
    rounded-md flex flex-col"
    >
      <i
        className={`bx bx-universal-access text-7xl text-${
          success ? "green-500" : "primary"
        }`}
      ></i>
      <p className="pt-3 pb-1 font-bold text-xl text-gray-700">
        Please check your mail
      </p>
      <p>We've sent a code to packer.tra@avepoint.com</p>
      <div className="flex items-center gap-2 justify-center py-5">
        {inputs.map((item, index) => (
          <input
            ref={refs[index]}
            key={item.key}
            className={`w-14 h-14 rounded-md border border-${
              item.error ? "red-500" : "primary"
            } border-solid text-center 
              text-2xl font-bold text-primary`}
            type="number"
            min={0}
            maxLength={1}
            value={item.value}
            onChange={(e) => {
              if (e.target.value.length > 1) {
                e.currentTarget.value = "";
              } else {
                setInputs(
                  [...inputs].map((val) => {
                    if (val.key === item.key) {
                      item.value = e.target.value ? Number(e.target.value) : "";
                    }
                    return val;
                  })
                );
              }
              if (!e.target.value) {
                if (index > 0) {
                  refs[index - 1].current?.focus();
                }
              } else {
                if (index < 5) {
                  refs[index + 1].current?.focus();
                }
              }
            }}
            max={9}
          />
        ))}
      </div>
      <p className="text-sm text-gray-500 cursor-pointer">
        Did't get the code?{" "}
        <span className="text-primary font-semibold underline">
          Click to resend
        </span>
      </p>
    </div>
  );
};

export default OTPVerify;
