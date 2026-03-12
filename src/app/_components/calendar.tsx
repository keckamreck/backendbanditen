"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./calendar.module.css";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type Props = {
  action: Dispatch<SetStateAction<Date>>;
  dateToday: Date;
  defaultDate: Date;
};

export default function Calendar({ action, dateToday, defaultDate }: Props) {
  const [year, setYear] = useState<number | "">(dateToday.getFullYear());
  const [month, setMonth] = useState<number>(dateToday.getMonth() + 1);
  const [selectedDate, setSelectedDate] = useState<Date>(defaultDate);
  const [days, setDays] = useState<number[][]>([]);
  const weekday: string[] = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
  const months: string[] = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];

  useEffect((): void => {
    getDays();
  }, [year, month]);

  function getDaysOfMonth(month: number, year: number): number {
    const daysPerMonth: number[] = [
      31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
    ];
    let numberOfDays: number;
    if (month === 1) {
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        numberOfDays = 29;
      } else {
        numberOfDays = 28;
      }
    } else {
      numberOfDays = daysPerMonth[month];
    }
    return numberOfDays;
  }

  function getDaysCurrentMonth(month: number, year: number): number[] {
    let numberOfDays: number = getDaysOfMonth(month - 1, year);
    let daysCurrentMonth: number[] = [];
    for (let i = 1; i <= numberOfDays; i++) {
      daysCurrentMonth.push(i);
    }
    return daysCurrentMonth;
  }

  function getDaysLastMonth(month: number, year: number): number[] {
    let numberOfDaysLastMonth: number;
    let daysLastMonth: number[] = [];
    let firstDay: number = new Date(year, month - 1, 1).getDay();
    if (firstDay === 0) {
      firstDay = 7;
    }
    if (month - 1 === 0) {
      numberOfDaysLastMonth = getDaysOfMonth(11, year - 1);
    } else {
      numberOfDaysLastMonth = getDaysOfMonth(month - 2, year);
    }
    for (
      let i: number = numberOfDaysLastMonth - (firstDay - 2);
      i <= numberOfDaysLastMonth;
      i++
    ) {
      daysLastMonth.push(i);
    }
    return daysLastMonth;
  }

  function getDaysNextMonth(month: number, year: number): number[] {
    let numberOfDaysLastMonth: number[] = [];
    let numberOfDaysCurrentMonth: number = getDaysOfMonth(month - 1, year);
    let lastDay: number = new Date(
      year,
      month - 1,
      numberOfDaysCurrentMonth,
    ).getDay();
    if (lastDay === 0) {
      lastDay = 7;
    }
    for (let i: number = 1; i <= 7 - lastDay; i++) {
      numberOfDaysLastMonth.push(i);
    }
    return numberOfDaysLastMonth;
  }

  function getDays(): void {
    let result: number[][] = [];
    if (year !== "" && year > -271821 && year < 275760) {
      result.push(getDaysLastMonth(month, year));
      result.push(getDaysCurrentMonth(month, year));
      result.push(getDaysNextMonth(month, year));
    }
    setDays(result);
  }

  function setNewYear(e: ChangeEvent<HTMLInputElement>): void {
    if (e.target.value !== "") {
      const newYear: string = e.target.value.replace(/\./g, "");
      setYear(parseInt(newYear));
    } else {
      setYear("");
    }
  }

  function oneMonthBack(): void {
    if (month === 1) {
      if (year !== "") {
        setYear(year - 1);
      }
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  }

  function oneMonthAgo(): void {
    if (month === 12) {
      if (year !== "") {
        setYear(year + 1);
      }
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  }

  function getClassDay(index: number, day: number): string {
    if (year !== "") {
      let y: number;
      let m: number;
      if (index === 0) {
        if (month === 1) {
          m = 12;
          y = year - 1;
        } else {
          m = month - 1;
          y = year;
        }
      } else if (index === 2) {
        if (month === 12) {
          m = 1;
          y = year + 1;
        } else {
          m = month + 1;
          y = year;
        }
      } else {
        m = month;
        y = year;
      }

      if (
        day === selectedDate.getDate() &&
        m === selectedDate.getMonth() + 1 &&
        y === selectedDate.getFullYear()
      ) {
        if (index === 0 || index === 2) {
          console.log("hier");
          return styles.remainingDaysSelected;
        } else {
          return styles.selectedDay;
        }
      } else if (
        index === 1 &&
        day === dateToday.getDate() &&
        month === dateToday.getMonth() + 1 &&
        year === dateToday.getFullYear()
      ) {
        return styles.today;
      } else {
        if (index === 0 || index === 2) {
          return styles.remainingDays;
        } else {
          return styles.currentDays;
        }
      }
    } else {
      return "";
    }
  }

  function setNewDeadline(day: number, index: number): void {
    let m: number;
    if (year !== "") {
      if (index === 0) {
        m = month - 2;
        oneMonthBack();
      } else if (index === 2) {
        m = month;
        oneMonthAgo();
      } else {
        m = month - 1;
      }
      setSelectedDate(new Date(year, m, day));
      action(
        new Date(
          year,
          m,
          day,
          defaultDate.getHours(),
          defaultDate.getMinutes(),
        ),
      );
    }
  }

  function checkInputYear(e: ChangeEvent<HTMLInputElement>): void {
    if (e.target.value === "") {
      setYear(dateToday.getFullYear());
    }
  }

  return (
    <div>
      <div className={styles.headerComponent}>
        <button type="button" className={styles.button} onClick={oneMonthBack}>
          <FontAwesomeIcon size="1x" icon={faChevronLeft} color="black" />
        </button>
        <select
          className={styles.selectShownMonth}
          value={months[month - 1]}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setMonth(months.indexOf(e.target.value) + 1)
          }
        >
          {months.map((month: string) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        <input
          type="number"
          className={`${styles.selectShownMonth} ${styles.selectYear}`}
          value={year}
          onChange={setNewYear}
          onBlur={checkInputYear}
        ></input>
        <button type="button" className={styles.button} onClick={oneMonthAgo}>
          <FontAwesomeIcon size="1x" icon={faChevronRight} color="black" />
        </button>
      </div>
      <div className={styles.calendar}>
        {weekday.map((day: string) => (
          <p className={styles.headerWeekdays} key={day}>
            {day}
          </p>
        ))}
        {days?.map((item: number[], index: number) =>
          item.map((day: number) => (
            <button
              type="button"
              className={getClassDay(index, day)}
              key={day}
              onClick={(): void => setNewDeadline(day, index)}
            >
              {day}
            </button>
          )),
        )}
      </div>
    </div>
  );
}
