import { useEffect, useRef, useState } from "react";
import "./index.scss";

const Calendar = () => {
  //
  const day31 = [1, 3, 5, 7, 8, 10, 12];
  const day30 = [4, 6, 9, 11];
  const days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date();
  date.setDate(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [clicked, setClicked] = useState(1);
  const ref = useRef<HTMLDivElement>(null);
  const [dateCurrent, setDateCurrent] = useState({
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    dayOfWeek: date.getDay(),
  });
  const [listDay, setListDay] = useState<
    {
      number: number;
      disabled: boolean;
    }[][]
  >([]);
  const [level, setLevel] = useState(1);
  const checkDay = (month: number): number => {
    let checkDay31 = day31.findIndex((item) => item === month);
    if (checkDay31 !== -1) return 31;
    let checkDay30 = day30.findIndex((item) => item === month);
    if (checkDay30 !== -1) return 30;
    //
    if (month === 2) {
      if (dateCurrent.year % 4 === 0) return 29;
      else return 28;
    }
    //
    return 0;
  };
  const renderCalendar = (month: number, year: number) => {
    const dateNew = new Date(`${month}-${1}-${year}`);
    const dayOfWeek = dateNew.getDay();
    let dayList: {
      number: number;
      disabled: boolean;
    }[] = Array(42).map((_, item) => {
      return {
        number: -1,
        disabled: true,
      };
    });
    const start = dayOfWeek || 7;
    for (let i = 0; i < start; i++) {
      dayList[i] = {
        number: (checkDay(month - 1) || 31) - (start - 2 - i),
        disabled: true,
      };
    }
    for (let i = 0; i < checkDay(month); i++) {
      dayList[start - 1 + i] = {
        number: i + 1,
        disabled: false,
      };
    }
    for (let i = checkDay(month) + start - 1; i < 42; i++) {
      dayList[i] = {
        number: i - (checkDay(month) + start - 1) + 1,
        disabled: true,
      };
    }
    return dayList;
  };
  const handleClick = (isLeft: boolean) => {
    setClicked(isLeft ? 0 : 2);
    let { month, year } = dateCurrent;

    if (isLeft) {
      month--;
      if (month < 1) {
        year--;
        month = 12;
      }
    } else {
      month++;
      if (month > 12) {
        year++;
        month = 1;
      }
    }

    const dateNew = new Date(`${month}-${1}-${year}`);
    setDateCurrent({
      day: 1,
      month: dateNew.getMonth() + 1,
      year: dateNew.getFullYear(),
      dayOfWeek: dateNew.getDay(),
    });
  };
  useEffect(() => {
    let { month, year } = dateCurrent;
    setListDay([
      // renderCalendar(
      //   month - 1 < 1 ? 12 : month - 1,
      //   month - 1 < 1 ? year - 1 : year
      // ),
      renderCalendar(month, year),
      // renderCalendar(
      //   month + 1 > 12 ? 1 : month + 1,
      //   month + 1 > 12 ? 1 : year + 1
      // ),
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateCurrent]);
  //
  return (
    <div
      className="border border-solid border-gray-200 py-2 px-4 rounded-sm cursor-pointer"
      style={{ width: 360 }}
    >
      <div className="flex justify-between py-2 items-center">
        <span
          onClick={() => handleClick(true)}
          className="bx bx-chevron-left text-xl w-8 h-8 rounded-md border border-solid 
        border-gray-200 flex justify-center items-center hover:bg-gray-200 cursor-pointer"
        ></span>
        <div
          onClick={() => setLevel(level + 1 > 3 ? 1 : level + 1)}
          className="flex-1 font-bold text-blue-700 text-base text-center"
        >
          {months[dateCurrent.month - 1]} {dateCurrent.year}
        </div>
        <span
          onClick={() => handleClick(false)}
          className="bx bx-chevron-right text-xl w-8 h-8 rounded-md border border-solid 
        border-gray-200 flex justify-center items-center hover:bg-gray-200 cursor-pointer"
        ></span>
      </div>
      {level === 1 && (
        <ul className="list list-day gap-2 py-2 font-semibold mt-2">
          {days.map((day) => (
            <li key={day}>{day}</li>
          ))}
        </ul>
      )}
      {level === 1 && (
        <div
          ref={ref}
          className="flex w-full items-stretch overflow-hidden relative"
        >
          {[...listDay].map((children, index) => (
            <ul
              key={Math.random()}
              className="list list-day gap-2 transition w-full shrink-0"
            >
              {[...children].map((item) => (
                <li
                  key={Math.random()}
                  className="relative"
                  style={{ paddingTop: "100%" }}
                >
                  <div
                    className={`absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center 
                ${
                  new Date().getDate() === item.number &&
                  new Date().getMonth() + 1 === dateCurrent.month &&
                  new Date().getFullYear() === dateCurrent.year &&
                  !item.disabled
                    ? "text-white bg-primary rounded-full font-semibold border-primary border border-solid"
                    : ""
                } ${
                      item.disabled
                        ? "opacity-40 font-semibold text-gray-500"
                        : ""
                    } hover:border-primary hover:border hover:border-solid rounded-full`}
                  >
                    {item.number}
                  </div>
                </li>
              ))}
            </ul>
          ))}
        </div>
      )}
      {level === 2 && (
        <ul className="list list-month">
          {[...months].map((item, index) => (
            <li
              key={Math.random()}
              className="relative hover:border hover:border-solid hover:border-gray-200 hover:shadow"
              style={{ paddingTop: "100%" }}
              onClick={() => {
                setDateCurrent({ ...dateCurrent, month: index + 1 });
                setLevel(1);
              }}
            >
              <div
                className={`absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center`}
              >
                {item}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Calendar;
