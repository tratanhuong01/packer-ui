import { useContext, useState } from "react";
import StepByStep from "../../../components/StepByStep";
import { StepProps } from "../../../components/StepByStep/type";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import FeatureComponent from "../FeatureComponent";
import ContentComponent from "../ContentComponent";
import { AdminContext } from "../../../contexts/AdminContext/AdminContext";
import { useNavigate } from "react-router-dom";

const NameComponent = ({
  value,
  handleChange,
}: {
  value: string;
  handleChange: (e: string) => void;
}) => {
  return (
    <Input
      width={410}
      type="text"
      value={value}
      mode="outlined"
      handleChange={(e) => {
        handleChange(e);
      }}
      placeholder={"Name component"}
    />
  );
};

const MainAdmin = () => {
  const {
    admin: { nameComponent, content },
    dispatch,
    actions: { updateNameComponent },
  } = useContext(AdminContext);
  const steps: StepProps[] = [
    {
      id: Math.random(),
      name: "Add name",
      index: 0,
      render: (
        <NameComponent
          value={nameComponent}
          handleChange={(e) => {
            dispatch(updateNameComponent(e));
          }}
        />
      ),
    },
    {
      id: Math.random(),
      name: "Create props",
      index: 0,
      render: <FeatureComponent />,
    },
    {
      id: Math.random(),
      name: "Create content",
      index: 0,
      render: <ContentComponent />,
    },
  ];
  const [stepCurrent, setStepCurrent] = useState<number>(0);
  const navigate = useNavigate();
  return (
    <div>
      <StepByStep stepCurrent={stepCurrent} steps={steps} />
      <div className="flex justify-end py-3 gap-3">
        {stepCurrent > 0 && (
          <Button
            type="button"
            mode="primary"
            handleClick={() => setStepCurrent(stepCurrent - 1)}
          >
            Back
          </Button>
        )}
        <Button
          type="button"
          mode="primary"
          handleClick={async () => {
            if (stepCurrent + 1 === steps.length) {
              await fetch("http://192.168.40.118:8000/components", {
                method: "POST",
                body: JSON.stringify({
                  id: Math.random(),
                  name: nameComponent,
                  type: "app",
                  component: content,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              });
              navigate("/");
            } else {
              setStepCurrent(stepCurrent + 1);
            }
          }}
        >
          {stepCurrent + 1 === steps.length ? "Save" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default MainAdmin;
