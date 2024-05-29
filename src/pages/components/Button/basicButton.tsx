import Button from "../../../components/Button";

const BasicButton = () => {
  return (
    <div className="flex justify-center items-center gap-3">
      <Button mode="text">Text</Button>
      <Button mode="primary">Primary</Button>
      <Button mode="outlined">Outlined</Button>
    </div>
  );
};

const basicButtonExpand = `import Button from "@/components/Button";

const BasicButton = () => {
  return (
    <div className="flex justify-center items-center gap-3">
      <Button mode="text">Text</Button>
      <Button mode="primary">Primary</Button>
      <Button mode="outlined">Outlined</Button>
    </div>
  );
};

export { BasicButton };`;

const basicButtonCollapse = `<div className="flex justify-center items-center gap-3">
    <Button mode="text">Text</Button>
    <Button mode="primary">Primary</Button>
    <Button mode="outlined">Outlined</Button>
</div>`;

export { BasicButton, basicButtonCollapse, basicButtonExpand };
