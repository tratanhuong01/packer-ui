import Input from "../../../components/Input";
import TitleDescription from "../../../modules/UI Components/components/TitleDescription";

const InputPage = () => {
  return (
    <div className="pb-8 flex flex-col gap-3">
      <TitleDescription type="big">Input</TitleDescription>
      <p>Input let users enter and edit text.</p>
      <p>
        Text fields allow users to enter text into a UI. They typically appear
        in forms and dialogs.
      </p>
      <TitleDescription type="normal">Basic TextField</TitleDescription>
      <p>
        The Input wrapper component is a complete form control including a
        label, input, and help text. It comes with three variants: outlined
        (default), filled, and standard.
      </p>
      <div className="w-80">
        <TitleDescription type="normal">Text</TitleDescription>
        <Input type="text" />
        <TitleDescription type="normal">Password</TitleDescription>
        <Input type="password" />
        <TitleDescription type="normal">File</TitleDescription>
        <Input type="file" />
        <TitleDescription type="normal">Color</TitleDescription>
        <Input type="color" />
        <TitleDescription type="normal">Search</TitleDescription>
        <Input type="search" />
      </div>
    </div>
  );
};

export default InputPage;
