import Button from "../../components/Button";
import ShowComponent from "../../modules/UI Components/components/ShowComponent";
import { basicButton } from "./code";

const ButtonPage = () => {
  return (
    <div>
      <p className="font-bold text-4xl mb-4">Button</p>
      <p className="py-1">
        Buttons allow users to take actions, and make choices, with a single
        tap.
      </p>
      <p className="pt-8 pb-4">
        Buttons communicate actions that users can take. They are typically
        placed throughout your UI, in places like:
      </p>
      <ul className="list-disc pl-8 mb-4">
        <li className="py-0.5">Modal Windows</li>
        <li className="py-0.5">Form</li>
        <li className="py-0.5">Card</li>
        <li className="py-0.5">Toolbars</li>
      </ul>
      <p className="font-bold text-2xl py-3">Basic button</p>
      <p>
        The Button comes with three variants: text (default), contained, and
        outlined.
      </p>
      <ShowComponent
        code={basicButton}
        component={
          <div className="flex gap-5 flex-wrap">
            <Button mode="text">TEXT</Button>
            <Button mode="contained">CONTAINED</Button>
            <Button mode="outlined">OUTLINED</Button>
          </div>
        }
      />
      <p className="font-bold text-2xl py-3">Text button</p>
      <p>
        The Button comes with three variants: text (default), contained, and
        outlined.
      </p>
      <ShowComponent
        code={basicButton}
        component={
          <div className="flex gap-5 flex-wrap">
            <Button>TEXT</Button>
            <Button disabled>DISABLED</Button>
            <Button href="#">LINK</Button>
          </div>
        }
      />
      <p className="font-bold text-2xl py-3">Contained button</p>
      <p>
        The Button comes with three variants: text (default), contained, and
        outlined.
      </p>
      <ShowComponent
        code={basicButton}
        component={
          <div className="flex gap-5 flex-wrap">
            <Button mode="contained">CONTAINED</Button>
            <Button mode="contained" disabled>
              DISABLED
            </Button>
            <Button mode="contained" href="#">
              LINK
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default ButtonPage;
