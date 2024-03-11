import { Link } from "react-router-dom";
import ShowComponent from "../../components/ShowComponent";
import * as code from "./code";
import components from "./components";

//
const AutoCompletePage = () => {
  return (
    <div className="text-lg">
      <p className="font-bold text-4xl mb-2">Autocomplete</p>
      <p className="pb-8">
        The autocomplete is a normal text input enhanced by a panel of suggested
        options.
      </p>
      <p>
        The widget is useful for setting the value of a single-line textbox in
        one of two types of scenarios:
      </p>
      <ul className="list-decimal list-item ml-6 pt-4">
        <li className="py-1">
          The value for the textbox must be chosen from a predefined set of
          allowed values, e.g., a location field must contain a valid location
          name:{" "}
          <Link to={""} className="text-blue-500 font-semibold underline">
            combo box
          </Link>
          .
        </li>
        <li className="py-1">
          The textbox may contain any arbitrary value, but it is advantageous to
          suggest possible values to the user, e.g., a search field may suggest
          similar or previous searches to save the user time:{" "}
          <Link to={""} className="text-blue-500 font-semibold underline">
            free solo
          </Link>
          .
        </li>
      </ul>
      <p className="mt-8 pb-2">
        It's meant to be an improved version of the "react-select" and
        "downshift" packages.
      </p>
      <div className="my-5">
        <p className="font-bold text-2xl">Combo box</p>
        <p className="py-2">
          The value must be chosen from a predefined set of allowed values.
        </p>
        <ShowComponent
          code={code.comboBoxCode}
          component={components.comboBox}
        />
      </div>
    </div>
  );
};

export default AutoCompletePage;
