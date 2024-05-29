type StepByStepProps = {
  steps: StepProps[];
  stepCurrent: number;
  setStepCurrent?: (val: number) => void;
};

type StepProps = {
  id: number;
  render: any;
  name: string;
  index: number;
};

export type { StepByStepProps, StepProps };
