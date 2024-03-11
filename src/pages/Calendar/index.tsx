import ShowComponent from "../../components/ShowComponent";
import { calendar } from "./code";
import components from "./components";

//
const CalendarPage = () => {
  return (
    <>
      <p className="font-bold text-4xl mb-4">Calendar</p>
      <p>
        The Date Calendar component lets users select a date without any input
        or popper / modal.
      </p>
      <div className="my-5">
        <ShowComponent code={calendar} component={components.calendar} />
      </div>
    </>
  );
};

export default CalendarPage;
