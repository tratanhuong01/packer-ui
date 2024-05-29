import Button from "../../../../components/Button";
import InstallationCode from "../../components/InstallationCode";
import ShowComponent from "../../components/ShowComponent";
import TitleDescription from "../../components/TitleDescription";

const Usage = () => {
  return (
    <div>
      <TitleDescription type="big">Usage</TitleDescription>
      <p>Learn the basics of working with Packer UI components.</p>
      <TitleDescription type="normal">Quickstart</TitleDescription>
      <p>
        After{" "}
        <span className="text-primary underline font-semibold cursor-pointer">
          installation
        </span>{" "}
        , you can import any Packer UI component and start playing around. For
        example, try changing the variant on the Button to outlined to see how
        the style changes:
      </p>
      <ShowComponent
        component={
          <div className="">
            <Button mode="outlined">Hello world</Button>
          </div>
        }
        code={{
          expand: `import * as React from 'react';
import Button from '@packer-ui/Button';

export default function ButtonUsage() {
  return <Button mode="outlined">Hello world</Button>;
}`,
          collapse: '<Button mode="outlined">Hello world</Button>',
        }}
      />
      <TitleDescription type="normal">Globals</TitleDescription>
      <p>
        Since Packer UI components are built to function in isolation, they
        don't require any kind of globally scoped styles. For a better user
        experience and developer experience, we recommend adding the following
        globals to your app.
      </p>
      <TitleDescription type="normal">Responsive meta tag</TitleDescription>
      <p>
        Packer UI is a mobile-first component library—we write code for mobile
        devices first, and then scale up the components as necessary using CSS
        media queries.
      </p>
      <p>
        To ensure proper rendering and touch zooming for all devices, add the
        responsive viewport meta tag to your {`<head>`} element:
      </p>
      <InstallationCode
        code={`<meta name="viewport" content="initial-scale=1, width=device-width" />`}
      />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Usage;
