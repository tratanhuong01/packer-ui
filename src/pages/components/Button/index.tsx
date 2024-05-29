import ShowComponent from "../../../modules/UI Components/components/ShowComponent";
import TitleDescription from "../../../modules/UI Components/components/TitleDescription";
import {
  BasicButton,
  basicButtonCollapse,
  basicButtonExpand,
} from "./basicButton";
import {
  ContainedButton,
  containedButtonCollapse,
  containedButtonExpand,
} from "./containedButton";

const ButtonPage = () => {
  return (
    <div>
      <TitleDescription type="big">Button</TitleDescription>
      <TitleDescription type="description">
        Buttons allow users to take actions, and make choices, with a single
        tap.
      </TitleDescription>
      <TitleDescription type="description">
        Buttons communicate actions that users can take. They are typically
        placed throughout your UI, in places like:
      </TitleDescription>
      <ul>
        <li></li>
      </ul>

      <ShowComponent
        title="Basic Button"
        component={<BasicButton />}
        code={{
          expand: basicButtonExpand,
          collapse: basicButtonCollapse,
        }}
      />
      <ShowComponent
        title="Contained Button"
        component={<ContainedButton />}
        code={{
          expand: containedButtonExpand,
          collapse: containedButtonCollapse,
        }}
      />
    </div>
  );
};

export default ButtonPage;
