"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faClock,
  faSquare,
} from "@fortawesome/free-regular-svg-icons";
import {
  faSquareCheck,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./editor.module.css";
import { NameTodo } from "./nameTodo";
import Calendar from "@/app/_components/calendar";
import { PriorityButton } from "@/app/_components/buttonsEditor";
import { Priority } from "@/app/_models/task";
import { Button } from "@/app/_components/buttonsEditor";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { List } from "@/app/_models/list";
import { saveTodo } from "@/app/_models/task";

type Props = {
  defaultTitle: string;
  defaultEnterDeadline: boolean;
  defaultDate: Date;
  defaultTimeHours: number;
  defaultTimeMinutes: number;
  lists: List[];
  defaultIndexSelectedList: number;
  defaultSelectedPriority: Priority;
  defaultNotes: string;
  saveAction: () => void;
  deleteButtonVisible: boolean;
  deleteAction?: () => void;
};

export default function Editor({
  defaultTitle,
  defaultEnterDeadline,
  defaultDate,
  defaultTimeHours,
  defaultTimeMinutes,
  lists,
  defaultIndexSelectedList,
  defaultSelectedPriority,
  defaultNotes,
  deleteButtonVisible,
  saveAction,
  deleteAction,
}: Props) {
  const [title, setTitle] = useState<string>(defaultTitle);
  const [enterDeadline, setEnterDeadline] =
    useState<boolean>(defaultEnterDeadline);
  const [visibilityClassForDeadline, setVisibilityClassForDeadline] = useState<
    "" | "hideElement"
  >(enterDeadline ? "" : "hideElement");
  const [visibilityClassForCalendar, setVisibilityClassForCalendar] = useState<
    "" | "hideElement"
  >(enterDeadline ? "" : "hideElement");
  const [date, setDate] = useState<Date>(
    new Date(
      defaultDate.getFullYear(),
      defaultDate.getMonth(),
      defaultDate.getDate(),
    ),
  );
  const [timeHour, setTimeHour] = useState<number>(defaultTimeHours);
  const inputHour = useRef<HTMLInputElement | null>(null);
  const [timeMinutes, setTimeMinutes] = useState<number>(defaultTimeMinutes);
  const inputMinutes = useRef<HTMLInputElement | null>(null);
  const [priority, setPriority] = useState<Priority>(defaultSelectedPriority);
  const [indexSelectedList, setIndexSelectedList] = useState<number>(
    defaultIndexSelectedList,
  );
  const [notes, setNotes] = useState<string>(defaultNotes);

  const [saveButtonDisabled, setSaveButtonDisabled] = useState<boolean>(false);

  useEffect((): void => {
    if (title !== "") {
      setSaveButtonDisabled(false);
    } else {
      setSaveButtonDisabled(true);
    }
  }, [title]);

  function setNewHour(e: ChangeEvent<HTMLInputElement>): void {
    let newHour: string = e.target.value.replace(/\D/g, "");
    if (newHour.length === 3) {
      const newHourArray: string[] = newHour.split("");
      newHour = `${newHourArray[0]}${newHourArray[1]}`;
    }
    if (parseInt(newHour) > 23) {
      newHour = "23";
    }
    setTimeHour(parseInt(newHour));
  }

  function setNewMinute(e: ChangeEvent<HTMLInputElement>): void {
    let newMinute: string = e.target.value.replace(/\D/g, "");
    if (newMinute.length === 3) {
      const newHourArray: string[] = newMinute.split("");
      newMinute = `${newHourArray[0]}${newHourArray[1]}`;
    }
    if (parseInt(newMinute) > 59) {
      newMinute = "59";
    }
    setTimeMinutes(parseInt(newMinute));
  }

  function checkInput(
    e: ChangeEvent<HTMLInputElement>,
    defaultValue: number,
    action: Dispatch<SetStateAction<number>>,
  ): void {
    if (e.target.value === "") {
      action(defaultValue);
    } else if (e.target.value.length === 1) {
      action(parseInt(e.target.value.toString().padStart(2, "0")));
    }
  }

  function selectList(e: ChangeEvent<HTMLSelectElement>) {
    for (let i in lists) {
      if (lists[i].title === e.target.value) {
        setIndexSelectedList(parseInt(i));
        break;
      }
    }
  }

  function saveToDo(): void {
    let result: saveTodo;
    const initialValues: saveTodo = {
      title: defaultTitle,
      enterDeadline: defaultEnterDeadline,
      date: defaultDate,
      timeHour: defaultTimeHours,
      timeMinutes: defaultTimeMinutes,
      indexSelectedList: defaultIndexSelectedList,
      selectedPriority: defaultSelectedPriority,
      notes: defaultNotes,
    };
    const currentValues: saveTodo = {
      title: title,
      enterDeadline: enterDeadline,
      date: date,
      timeHour: timeHour,
      timeMinutes: timeMinutes,
      indexSelectedList: indexSelectedList,
      selectedPriority: priority,
      notes: notes,
    };

    saveAction();
  }

  function deleteToDo(): void {
    if (deleteAction !== undefined) {
      deleteAction();
    }
  }

  return (
    <>
      <form onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}>
        <div className={`${styles.dflexRow} ${styles.titleComponent}`}>
          <FontAwesomeIcon size="2x" icon={faChevronLeft} />
          <NameTodo
            className={`${styles.title}`}
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
        </div>

        <div className={`${styles.bodyForm} ${styles.dflexCol}`}>
          <div className={`${styles.dflexRow}`}>
            <button
              className={`${styles.buttonShowDeadline}`}
              onClick={() => {
                setVisibilityClassForDeadline(
                  visibilityClassForCalendar === "hideElement"
                    ? ""
                    : "hideElement",
                );
                setEnterDeadline(!enterDeadline);
                setVisibilityClassForCalendar(
                  visibilityClassForCalendar === "hideElement"
                    ? ""
                    : "hideElement",
                );
              }}
            >
              <FontAwesomeIcon
                className={styles.iconShowDeadline}
                icon={
                  visibilityClassForDeadline === "hideElement"
                    ? faSquare
                    : faSquareCheck
                }
              />
            </button>
            <label>Fälligkeit:</label>
          </div>
          <div
            className={`${styles.dflexCol} ${styles[visibilityClassForDeadline]}`}
          >
            <div className={`${styles.dflexRow} ${styles.date}`}>
              <FontAwesomeIcon
                className={styles.iconDate}
                size="1x"
                icon={faCalendar}
              />
              <input
                className={`${styles.stringDate} ${styles.input}`}
                type="text"
                readOnly={true}
                value={`${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getFullYear()}`}
                onClick={() =>
                  setVisibilityClassForCalendar(
                    visibilityClassForCalendar === "hideElement"
                      ? ""
                      : "hideElement",
                  )
                }
              ></input>
            </div>
            <div
              className={`${styles.dflexCol} ${styles.calendar} ${styles[visibilityClassForCalendar]}`}
            >
              <Calendar
                action={setDate}
                dateToday={new Date()}
                defaultDate={date}
              ></Calendar>
            </div>
            <div className={`${styles.dflexRow}`}>
              <FontAwesomeIcon
                className={styles.iconTime}
                size="1x"
                icon={faClock}
              />
              <input
                className={`${styles.input} ${styles.time} ${styles.hours}`}
                id="time"
                name="hour"
                type="text"
                ref={inputHour}
                value={timeHour}
                maxLength={3}
                pattern="[0-9]*"
                onChange={setNewHour}
                onBlur={(e) => {
                  checkInput(e, defaultTimeHours, setTimeHour);
                }}
              ></input>
              :
              <input
                className={`${styles.input} ${styles.time} ${styles.minutes}`}
                id="time"
                name="minute"
                type="text"
                ref={inputMinutes}
                value={timeMinutes}
                maxLength={3}
                pattern="[0-9]*"
                onChange={setNewMinute}
                onBlur={(e) => {
                  checkInput(e, defaultTimeMinutes, setTimeMinutes);
                }}
              ></input>
            </div>
          </div>
          <div className={`${styles.list} ${styles.dflexRow}`}>
            <label className={styles.labelList} htmlFor="list">
              Liste:
            </label>
            <select
              className={`${styles.selectList} ${styles.input}`}
              id="list"
              name="list"
              value={lists[indexSelectedList].title}
              onChange={selectList}
            >
              {lists.map((list: List) => (
                <option className={styles.selectedList} key={list.id}>
                  {list.title}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.dflexCol}>
            <label>Priorität: </label>
            <PriorityButton
              className={styles.priorityButton}
              action={setPriority}
              defaultValue={priority}
            />
          </div>

          <label htmlFor="notes">Notizen </label>
          <textarea
            className={styles.input}
            id="notes"
            name="notes"
            rows={5}
            value={notes}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setNotes(e.target.value)
            }
          ></textarea>
        </div>
        <div className={`${styles.saveDeleteButtons} ${styles.dflexRow}`}>
          <Button
            className={deleteButtonVisible ? "" : styles.hideElement}
            action={deleteToDo}
            task={"delete"}
          />
          <Button
            action={saveToDo}
            disabled={saveButtonDisabled}
            task={"save"}
          />
        </div>
      </form>
    </>
  );
}
