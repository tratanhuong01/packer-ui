import TitleDescription from "../../components/TitleDescription";
import InstallationCode from "../../components/InstallationCode";

const Installation = () => {
  return (
    <div>
      <TitleDescription type="big">Installation</TitleDescription>
      <p>Install Packer UI, the world's most popular React UI framework.</p>
      <TitleDescription type="normal">Default installation</TitleDescription>
      <p>Run one of the following commands to add Packer UI to your project:</p>
      <InstallationCode code="npm install packer-ui" />
      <TitleDescription type="normal">Add css</TitleDescription>
      <p>
        In file{" "}
        <span className="px-2 py-1 rounded-lg bg-gray-200">index.jsx</span> or{" "}
        <span className="px-2 py-1 rounded-lg bg-gray-200">index.jsx</span>
        add this code
      </p>
      <InstallationCode code={`import "packer-ui/dist/esm/index.css"`} />
      <TitleDescription type="normal">TailwindCSS & Boxicons</TitleDescription>
      <p>
        + PackerUI built base and class of{" "}
        <span
          title="https://tailwindcss.com/docs/installation"
          className="text-primary underline font-bold cursor-pointer"
        >
          TailwindCSS
        </span>
      </p>
      <p>
        + PackerUI using icon of{" "}
        <span
          title="https://tailwindcss.com/docs/installation"
          className="text-primary underline font-bold cursor-pointer"
        >
          Boxicons
        </span>
      </p>
      <p>
        You can see and install{" "}
        <span
          title="https://tailwindcss.com/docs/installation"
          className="text-primary underline font-bold cursor-pointer"
        >
          TailwindCSS
        </span>{" "}
        and{" "}
        <span
          title="https://tailwindcss.com/docs/installation"
          className="text-primary underline font-bold cursor-pointer"
        >
          Boxicons
        </span>{" "}
        here.
      </p>
    </div>
  );
};

export default Installation;
