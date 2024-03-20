// import Button from "../../../../components/Button";
import Button from "../../../../components/Button";
import ShowComponent from "../ShowComponent";
import TitleDescription from "../TitleDescription";

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

      default:
        return <></>;
    }
  };
  return renderComponent();
};

const RenderComponent = ({ data }: { data: any[] }) => {
  return (
    <div>
      {data.map((item: any) => (
        <RenderComponentByType key={item.id} item={item} />
      ))}
    </div>
  );
};
const RenderComponentByType = ({ item }: { item: any }) => {
  const renderData = () => {
    switch (item.type.toLowerCase()) {
      case "title":
        return <TitleDescription type="big">{item.content}</TitleDescription>;
      case "normal":
        return (
          <TitleDescription type="normal">{item.children}</TitleDescription>
        );
      case "list":
        return (
          <ul className={`${item.renderType} pl-5`}>
            {item.content.map((item: any) => (
              <li className="mb-2">{item}</li>
            ))}
          </ul>
        );
      case "description":
        return <TitleDescription type="small">{item.content}</TitleDescription>;
      case "show":
        return (
          <ShowComponent
            component={<ComponentDisplay component={item.component} />}
            code={{
              expand: item.component.code.expand,
              collapse: item.component.code.collapse,
            }}
          />
        );
      default:
        return <></>;
    }
  };
  return renderData();
};
/*
{
    id: Math.random(),
    content: string,
    type: "title" | "list" | "show"  | "description" | "normal",
    renderType: string || string[],
    component: {
        code : {
            expand: '',
            collapse: ''
        },
        name: string
        props: {

        }
    }
}
*/

export default RenderComponent;
