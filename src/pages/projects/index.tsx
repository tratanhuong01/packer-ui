import Button from "../../components/Button";
import Input from "../../components/Input";
import ItemProject from "./ItemProject";
import "./index.scss";

const Projects = () => {
  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="w-full h-full overflow-y-scroll">
        <div className="projects p-4">
          <div className="w-full flex mb-4 items-center gap-4">
            <div className="flex-1">
              <Input placeholder="Search" />
            </div>
            <Button mode="outlined">Search</Button>
          </div>
          <div className="w-full grid grid-cols-3 gap-4">
            <ItemProject />
            <ItemProject />
            <ItemProject />
            <ItemProject />
            <ItemProject />
            <ItemProject />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
