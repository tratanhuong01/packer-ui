import "./index.scss";
import { StepByStepProps, StepProps } from "./type";

const StepByStep = ({
  steps,
  stepCurrent,
  setStepCurrent,
}: StepByStepProps) => {
  //
  //
  return (
    <div>
      <div className="flex mb-10 ml-12 justify-center">
        {steps.map((step: StepProps, index) => (
          <div
            onClick={() => setStepCurrent && setStepCurrent(index)}
            className=""
            key={step.id}
          >
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full border-2 border-solid cursor-pointer ${
                  index < stepCurrent
                    ? "border-primary bx bx-check text-white bg-primary"
                    : index === stepCurrent
                    ? "border-primary"
                    : "border-gray-500 opacity-50 cursor-not-allowed"
                }
                flex items-center justify-center relative`}
              >
                {index === stepCurrent && (
                  <span className="w-5 h-5 rounded-full bg-primary"></span>
                )}
                {index > stepCurrent && (
                  <span
                    className="w-5 h-5 rounded-full bg-gray-500 bx bx-question-mark flex 
                items-center justify-center text-white"
                  ></span>
                )}
              </div>
              {index + 1 !== [1, 2, 3].length && (
                <div
                  className={`w-32 h-0.5 ${
                    index < stepCurrent ? "bg-primary" : "bg-gray-500"
                  }`}
                ></div>
              )}
            </div>
            <p
              className={`text-center text-xs w-40 -ml-16 text-wrap font-semibold 
              text-${index <= stepCurrent ? "primary" : "gray-500"} mt-1`}
            >
              {step.name}
            </p>
          </div>
        ))}
      </div>
      <div className="w-full py-5">
        {steps[stepCurrent] && steps[stepCurrent].render}
      </div>
    </div>
  );
};
export default StepByStep;
