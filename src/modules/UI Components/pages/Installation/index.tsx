import TitleDescription from "../../components/TitleDescription";
import InstallationCode from "../../components/InstallationCode";

const Installation = () => {
  return (
    <div>
      <TitleDescription type="big">Installation</TitleDescription>
      <p>Install Material UI, the world's most popular React UI framework.</p>
      <TitleDescription type="normal">Default installation</TitleDescription>
      <p>
        Run one of the following commands to add Material UI to your project:
      </p>
      <InstallationCode code="npm install @packer-ui" />
      <TitleDescription type="normal">Peer dependencies</TitleDescription>
      <p>
        Please note that{" "}
        <span className="text-blue-500 underline font-semibold cursor-pointer">
          react
        </span>{" "}
        and
        <span className="text-blue-500 underline font-semibold cursor-pointer">
          {" "}
          react-dom{" "}
        </span>
        are peer dependencies, meaning you should ensure they are installed
        before installing Material UI.
        <InstallationCode
          code={`"peerDependencies": {
    "react": "^17.0.0 || ^18.0.0",
    "react-dom": "^17.0.0 || ^18.0.0"
  },
`}
        />
      </p>
    </div>
  );
};

export default Installation;
