import TitleDescription from "../../components/TitleDescription";

const Overview = () => {
  return (
    <div>
      <TitleDescription type="big">Packer UI - Overview</TitleDescription>
      <p>
        Packer UI is an open-source React component library that implements
        Packer Design. It's comprehensive and can be used in production out of
        the box.
      </p>
      <TitleDescription type="normal">Introduction</TitleDescription>
      <p>
        Packer UI is an open-source React component library that implements
        Packer Design.
      </p>
      <p>
        It includes a comprehensive collection of prebuilt components that are
        ready for use in production right out of the box, and features a suite
        of customization options that make it easy to implement your own custom
        design system on top of our components.
      </p>
      <TitleDescription type="normal">Advantages of Packer UI</TitleDescription>
      <ol className="list-disc pl-5 flex flex-col gap-2 pt-2 pb-2">
        <li>
          <span className="font-semibold">Customizability</span>: The library
          includes an extensive set of intuitive customizability features. The
          templates in our store demonstrate how far you can go with
          customization.
        </li>
        <li>
          <span className="font-semibold">Cross-team collaboration</span>:
          Packer UI's intuitive developer experience reduces the barrier to
          entry for back-end developers and less technical designers, empowering
          teams to collaborate more effectively. The design kits streamline your
          workflow and boost consistency between designers and developers.
          Trusted by thous
        </li>
      </ol>
    </div>
  );
};

export default Overview;
