import Button from "../../../components/Button";

const ContainedButton = () => {
  return (
    <div className="flex justify-center items-center gap-3">
      <Button mode="text">Text</Button>
      <Button mode="disabled">Disabled</Button>
      <Button mode="gray">Gray</Button>
    </div>
  );
};

const containedButtonExpand = `import Button from "@/components/Button";

const ContainedButton = () => {
  return (
    <div className="flex justify-center items-center gap-3">
      <Button mode="text">Text</Button>
      <Button mode="disabled">Disabled</Button>
      <Button mode="gray">Gray</Button>
    </div>
  );
};

export { ContainedButton };`;

const containedButtonCollapse = `<div className="flex justify-center items-center gap-3">
  <Button mode="text">Text</Button>
  <Button mode="disabled">Disabled</Button>
  <Button mode="gray">Gray</Button>
</div>`;

export { ContainedButton, containedButtonCollapse, containedButtonExpand };
