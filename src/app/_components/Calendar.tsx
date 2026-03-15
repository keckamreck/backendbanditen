"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Calendar.module.css";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type CalendarProps = {
  onDateChangeAction: Dispatch<SetStateAction<Date>>;
  dateToday: Date;
  initialDate: Date;
};

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
const minYear: number = -271821;
const maxYear: number = 275760;

export default function Calendar({
  onDateChangeAction,
  dateToday,
  initialDate,
}: CalendarProps) {
  const [year, setYear] = useState<number | "">(dateToday.getFullYear());
  const [month, setMonth] = useState<number>(dateToday.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [days, setDays] = useState<number[][]>([]);

  useEffect((): void => {
    getDays();
  }, [year, month]);

  function getDaysOfMonth(month: number, year: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  function getDaysOfCurrentMonth(month: number, year: number): number[] {
    const numberOfDays: number = getDaysOfMonth(month, year);
    let daysCurrentMonth: number[] = [];
    for (let i: number = 1; i <= numberOfDays; i++) {
      daysCurrentMonth.push(i);
    }
    return daysCurrentMonth;
  }

  function getDaysOfPreviousMonth(month: number, year: number): number[] {
    const numberOfDaysLastMonth: number = getDaysOfMonth(month - 1, year);
    let daysLastMonth: number[] = [];
    let firstDayCurrentMonth: number = new Date(year, month, 1).getDay();
    if (firstDayCurrentMonth === 0) {
      firstDayCurrentMonth = 7;
    }
    for (
      let i: number = numberOfDaysLastMonth - (firstDayCurrentMonth - 2);
      i <= numberOfDaysLastMonth;
      i++
    ) {
      daysLastMonth.push(i);
    }
    return daysLastMonth;
  }

  function getDaysOfNextMonth(month: number, year: number): number[] {
    let numberOfDaysNextMonth: number[] = [];
    const numberOfDaysCurrentMonth: number = getDaysOfMonth(month, year);
    let lastDayOfCurrentMonth: number = new Date(
      year,
      month,
      numberOfDaysCurrentMonth,
    ).getDay();
    if (lastDayOfCurrentMonth === 0) {
      lastDayOfCurrentMonth = 7;
    }
    for (let i: number = 1; i <= 7 - lastDayOfCurrentMonth; i++) {
      numberOfDaysNextMonth.push(i);
    }
    return numberOfDaysNextMonth;
  }

  function getDays(): void {
    let result: number[][] = [];
    if (year !== "" && year > minYear && year < maxYear) {
      result.push(getDaysOfPreviousMonth(month, year));
      result.push(getDaysOfCurrentMonth(month, year));
      result.push(getDaysOfNextMonth(month, year));
    }
    setDays(result);
  }

  function goToPreviousMonth(): void {
    if (month === 0) {
      if (year !== "") {
        setYear(year - 1);
      }
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  }

  function goToNextMonth(): void {
    if (month === 11) {
      if (year !== "") {
        setYear(year + 1);
      }
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  }

  function getDayClassName(index: number, day: number): string {
    if (year !== "") {
      let y: number;
      let m: number;
      if (index === 0) {
        if (month === 0) {
          m = 11;
          y = year - 1;
        } else {
          m = month - 1;
          y = year;
        }
      } else if (index === 2) {
        if (month === 11) {
          m = 0;
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
        m === selectedDate.getMonth() &&
        y === selectedDate.getFullYear()
      ) {
        if (index === 0 || index === 2) {
          return styles.remainingDaysSelected;
        } else {
          return styles.selectedDay;
        }
      } else if (
        day === dateToday.getDate() &&
        m === dateToday.getMonth() &&
        y === dateToday.getFullYear()
      ) {
        if (index === 0 || index === 2) {
          return styles.remainingDayToday;
        } else {
          return styles.currentDayToday;
        }
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

  function handleChangeYear(e: ChangeEvent<HTMLInputElement>): void {
    if (e.target.value !== "") {
      const newYear: string = e.target.value.replace(/\./g, "");
      setYear(parseInt(newYear));
    } else {
      setYear("");
    }
  }

  function handleChangeDeadline(day: number, index: number): void {
    let m: number;
    if (year !== "") {
      if (index === 0) {
        m = month - 1;
        goToPreviousMonth();
      } else if (index === 2) {
        m = month + 1;
        goToNextMonth();
      } else {
        m = month;
      }
      setSelectedDate(new Date(year, m, day));
      onDateChangeAction(
        new Date(
          year,
          m,
          day,
          initialDate.getHours(),
          initialDate.getMinutes(),
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
        <button
          type="button"
          className={styles.button}
          onClick={goToPreviousMonth}
        >
          <FontAwesomeIcon size="1x" icon={faChevronLeft} color="black" />
        </button>
        <select
          className={styles.selectShownMonth}
          value={months[month]}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setMonth(months.indexOf(e.target.value))
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
          onChange={handleChangeYear}
          onBlur={checkInputYear}
        ></input>
        <button type="button" className={styles.button} onClick={goToNextMonth}>
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
              className={getDayClassName(index, day)}
              key={`${index}-${day}`}
              onClick={(): void => handleChangeDeadline(day, index)}
            >
              {day}
            </button>
          )),
        )}
      </div>
    </div>
  );
}
