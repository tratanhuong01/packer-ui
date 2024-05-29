// import Button from "../../../../components/Button";
import Alert from "../../../../components/Alert";
import Button from "../../../../components/Button";
import { sortBy } from "../../../../utils/utils";
import Content from "../../../Admin/interfaces/Content";
import ShowComponent from "../ShowComponent";
import ListComponent from "./ListComponent";
import TitleComponent from "./TitleComponent";

const ComponentDisplay = ({ component }: { component: any }) => {
  const renderComponent = () => {
    switch (component.name) {
      case "Button":
        return typeof component.props.length === "number" ? (
          <div className="flex items-center justify-center gap-4">
            {component.props.map((item: any) => (
              <Button {...item} />
            ))}
          </div>
        ) : (
          <Button {...component.props} />
        );
      case "Alert":
        return component.props ? (
          <Alert {...component.props} />
        ) : (
          <div className="flex my-2 justify-center">
            <Button mode="outlined">Config component</Button>
          </div>
        );
      default:
        return <></>;
    }
  };
  return renderComponent();
};

const RenderComponent = ({ data }: { data: Content[] }) => {
  return (
    <div className="w-11/12">
      {sortBy<Content>(data, "index").map((item: Content) => (
        <div key={Math.random()}>
          <RenderComponentByType item={item} />
        </div>
      ))}
    </div>
  );
};
const RenderComponentByType = ({ item }: { item: Content }) => {
  const renderData = () => {
    switch (item.type.toLowerCase()) {
      case "title":
        return <TitleComponent item={item} type="big" />;
      case "normal":
        return <TitleComponent item={item} type="normal" />;
      case "description":
        return <TitleComponent item={item} type="description" />;
      case "list":
        return <ListComponent item={item} />;
      case "show":
        return (
          <ShowComponent
            component={<ComponentDisplay component={item.code} />}
            code={{
              expand: item.code.code.expand,
              collapse: item.code.code.collapse,
            }}
          />
        );
      default:
        return <></>;
    }
  };
  return renderData();
};

export default RenderComponent;
