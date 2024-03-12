import Input from "../../components/Input";
import ShowComponent from "../../modules/UI Components/components/ShowComponent";
import * as code from "./code";

//
const InputPage = () => {
  return (
    <div className="text-lg">
      <p className="font-bold text-4xl mb-2">Input</p>
      <p className="pb-8">Input let users enter and edit text.</p>
      <div className="my-5">
        <p className="font-bold text-2xl">Basic Input</p>
        <p className="py-2">
          The Input wrapper component is a complete form control including a
          label, input, and help text. It comes with three variants: outlined
          (default), filled, and standard.
        </p>
        <ShowComponent
          code={code.basicInput}
          component={
            <div className="flex gap-5 flex-wrap">
              <Input type="text" mode="outlined" />
              <Input type="search" mode="filled" />
              <Input type="password" mode="standard" />
            </div>
          }
        />
      </div>
    </div>
  );
};

export default InputPage;
