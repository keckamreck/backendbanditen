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
import { useRouter } from "next/navigation";

type Props = {
  defaultTitle: string;
  defaultEnterDeadline: boolean;
  defaultDeadline: Date;
  lists: List[];
  defaultIdSelectedList: number;
  defaultSelectedPriority: Priority;
  defaultNotes: string;
  saveAction: (todo: saveTodo) => void;
  deleteButtonVisible: boolean;
  deleteAction?: () => void;
};

export default function Editor({
  defaultTitle,
  defaultEnterDeadline,
  defaultDeadline,
  lists,
  defaultIdSelectedList,
  defaultSelectedPriority,
  defaultNotes,
  deleteButtonVisible,
  saveAction,
  deleteAction,
}: Props) {
  const router = useRouter();
  const [title, setTitle] = useState<string>(defaultTitle);
  const [enterDeadline, setEnterDeadline] =
    useState<boolean>(defaultEnterDeadline);
  const [visibilityClassForDeadline, setVisibilityClassForDeadline] = useState<
    "" | "hideElement"
  >(enterDeadline ? "" : "hideElement");
  const [visibilityClassForCalendar, setVisibilityClassForCalendar] = useState<
    "" | "hideElement"
  >(enterDeadline ? "" : "hideElement");
  const [date, setDate] = useState<Date>(defaultDeadline);
  const inputHour = useRef<HTMLInputElement | null>(null);
  const inputMinutes = useRef<HTMLInputElement | null>(null);
  const [priority, setPriority] = useState<Priority>(defaultSelectedPriority);
  const [idSelectedList, setIdSelectedList] = useState<number>(
    defaultIdSelectedList,
  );
  const [notes, setNotes] = useState<string>(defaultNotes);

  const [saveButtonDisabled, setSaveButtonDisabled] = useState<boolean>(false);

  useEffect((): void => {
    if (title !== "" && title.trim() !== "") {
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
    setDate(
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        parseInt(newHour),
        date.getMinutes(),
      ),
    );
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
    setDate(
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        parseInt(newMinute),
      ),
    );
  }

  function checkInputHour(e: ChangeEvent<HTMLInputElement>): void {
    if (e.target.value === "") {
      setDate(
        new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          defaultDeadline.getHours(),
          date.getMinutes(),
        ),
      );
    } else if (e.target.value.length === 1) {
      setDate(
        new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          parseInt(e.target.value),
          date.getMinutes(),
        ),
      );
    }
  }

  function checkInputMinutes(e: ChangeEvent<HTMLInputElement>): void {
    if (e.target.value === "") {
      setDate(
        new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          date.getHours(),
          defaultDeadline.getMinutes(),
        ),
      );
    } else if (e.target.value.length === 1) {
      setDate(
        new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          date.getHours(),
          parseInt(e.target.value),
        ),
      );
    }
  }

  function selectList(e: ChangeEvent<HTMLSelectElement>) {
    for (let list of lists) {
      if (list.title === e.target.value) {
        setIdSelectedList(list.id);
        break;
      }
    }
  }

  function saveToDo(): void {
    const currentValues: saveTodo = {
      title: title.trim(),
      enterDeadline: enterDeadline,
      deadline: date,
      idSelectedList: idSelectedList,
      selectedPriority: priority,
      notes: notes.trim(),
    };
    saveAction(currentValues);
    router.push(`/list/${idSelectedList}`);
  }

  function deleteToDo(): void {
    if (deleteAction !== undefined) {
      deleteAction();
      router.push(`/list/${idSelectedList}`);
    }
  }

  return (
    <>
      <form
        className={styles.form}
        onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
      >
        <div className={`${styles.dflexRow} ${styles.titleComponent}`}>
          <FontAwesomeIcon
            className={styles.iconGoBack}
            size="2x"
            icon={faChevronLeft}
            onClick={() => router.push(`/list/${idSelectedList}`)}
          />
          <NameTodo
            className={`${styles.title}`}
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
            }}
          />
        </div>

        <div className={`${styles.bodyForm} ${styles.dflexCol}`}>
          <div className={`${styles.dflexRow} ${styles.labelDeadline}`}>
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
            <label>Fälligkeit</label>
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
              <p
                className={`${styles.stringDate} ${styles.input}`}
                onClick={() =>
                  setVisibilityClassForCalendar(
                    visibilityClassForCalendar === "hideElement"
                      ? ""
                      : "hideElement",
                  )
                }
              >
                {date.toLocaleDateString("de-DE", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
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
                value={date.getHours().toString().padStart(2, "0")}
                maxLength={3}
                pattern="[0-9]*"
                onChange={setNewHour}
                onBlur={(e) => {
                  checkInputHour(e);
                }}
              ></input>
              :
              <input
                className={`${styles.input} ${styles.time} ${styles.minutes}`}
                id="time"
                name="minute"
                type="text"
                ref={inputMinutes}
                value={date.getMinutes().toString().padStart(2, "0")}
                maxLength={3}
                pattern="[0-9]*"
                onChange={setNewMinute}
                onBlur={(e) => {
                  checkInputMinutes(e);
                }}
              ></input>
            </div>
          </div>
          <span className={styles.separator}></span>
          <div className={`${styles.list} ${styles.dflexCol}`}>
            <label className={styles.labelList} htmlFor="list">
              Liste
            </label>
            <select
              className={`${styles.selectList} ${styles.input}`}
              id="list"
              name="list"
              value={lists[idSelectedList].title}
              onChange={selectList}
            >
              {lists.map((list: List) => (
                <option className={styles.selectedList} key={list.id}>
                  {list.title}
                </option>
              ))}
            </select>
          </div>
          <span className={styles.separator}></span>
          <div className={styles.dflexCol}>
            <label>Priorität </label>
            <PriorityButton
              className={styles.priorityButton}
              action={setPriority}
              defaultValue={priority}
            />
          </div>
          <span className={styles.separator}></span>
          <label htmlFor="notes">Notizen </label>
          <textarea
            className={`${styles.input} ${styles.notes}`}
            id="notes"
            name="notes"
            rows={4}
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
