type StepByStepProps = {
  steps: StepProps[];
  stepCurrent: number;
};

type StepProps = {
  id: number;
  render: any;
  name: string;
  index: number;
};

export type { StepByStepProps, StepProps };
