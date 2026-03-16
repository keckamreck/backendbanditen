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
import styles from "./EditorForm.module.css";
import { NameTask } from "./NameTask";
import Calendar from "@/app/_components/Calendar";
import { PriorityButton } from "@/app/_components/PriorityButton";
import { Button } from "@/app/_components/ButtonsEditor";
import { ChangeEvent, FormEvent, useState } from "react";
import { List } from "@/app/_models/list";
import { TaskFormattedForEditor, Priority } from "@/app/_models/task";
import { useRouter } from "next/navigation";
import { Modal } from "@/app/_components/modal";

interface EditorFormProps {
  initialValues: TaskFormattedForEditor;
  lists: List[];
  saveAction: (task: TaskFormattedForEditor) => void;
  deleteButtonVisible: boolean;
  deleteAction?: () => void;
}

export default function EditorForm({
  initialValues,
  lists,
  deleteButtonVisible,
  saveAction,
  deleteAction,
}: EditorFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState<string>(initialValues.title);
  const [enterDeadline, setEnterDeadline] = useState<boolean>(
    initialValues.enterDeadline,
  );
  const [calendarVisible, setCalendarVisible] =
    useState<boolean>(enterDeadline);
  const [date, setDate] = useState<Date>(initialValues.deadline);
  const [priority, setPriority] = useState<Priority>(
    initialValues.selectedPriority,
  );
  const [idSelectedList, setIdSelectedList] = useState<number>(
    initialValues.idSelectedList,
  );
  const [notes, setNotes] = useState<string>(initialValues.notes);
  const [showModalConfirmGoBack, setShowModalConfirmGoBack] =
    useState<boolean>(false);
  const [showModalConfirmDelete, setShowModalConfirmDelete] =
    useState<boolean>(false);

  function checkInputTime(input: string): string {
    let newInput: string = input.replace(/\D/g, "");
    if (newInput.length === 3) {
      const newInputArray: string[] = newInput.split("");
      if (newInputArray[0] == "0") {
        newInput = `${newInputArray[1]}${newInputArray[2]}`;
      } else {
        newInput = `${newInputArray[0]}${newInputArray[1]}`;
      }
    }
    if (Number.isNaN(parseInt(newInput))) {
      return "00";
    } else {
      return newInput;
    }
  }

  function handleChangeHour(e: ChangeEvent<HTMLInputElement>): void {
    let newHour: string = checkInputTime(e.target.value);
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

  function handleChangeMinute(e: ChangeEvent<HTMLInputElement>): void {
    let newMinute: string = checkInputTime(e.target.value);
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

  function handleChangeSelectedList(e: ChangeEvent<HTMLSelectElement>) {
    const selectedList: List | undefined = lists.find(
      (list: List) => list.title === e.target.value,
    );
    if (selectedList !== undefined) {
      setIdSelectedList(selectedList.id);
    }
  }

  function saveTask(): void {
    const currentValues: TaskFormattedForEditor = {
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

  function deleteTask(): void {
    if (deleteAction !== undefined) {
      deleteAction();
      router.push(`/list/${idSelectedList}`);
    }
  }

  return (
    <form
      className={styles.form}
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        saveTask();
      }}
    >
      <div className={`${styles.dflexRow} ${styles.titleComponent}`}>
        <button
          type="button"
          className={styles.buttonGoBack}
          onClick={() => setShowModalConfirmGoBack(true)}
        >
          <FontAwesomeIcon
            className={styles.iconGoBack}
            size="2x"
            icon={faChevronLeft}
          />
        </button>
        {showModalConfirmGoBack && (
          <Modal
            onClose={(): void => {
              setShowModalConfirmGoBack(false);
            }}
            onConfirm={() => router.push(`/list/${idSelectedList}`)}
            title={
              "Beim Verlassen dieser Seite gehen ihre Eingaben verloren. Möchten Sie diese Seite dennoch verlassen?"
            }
            yes={"Ja"}
            no={"Nein"}
          />
        )}
        <NameTask
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
            type="button"
            onClick={() => {
              setEnterDeadline(!enterDeadline);
              setCalendarVisible(!enterDeadline);
            }}
          >
            <FontAwesomeIcon
              className={styles.iconShowDeadline}
              icon={enterDeadline ? faSquareCheck : faSquare}
            />
          </button>
          <label>Fälligkeit</label>
        </div>
        <div
          className={`${styles.dflexCol} ${styles[enterDeadline ? "" : "hideElement"]}`}
        >
          <div className={`${styles.dflexRow} ${styles.date}`}>
            <FontAwesomeIcon
              className={styles.iconDate}
              size="1x"
              icon={faCalendar}
            />
            <p
              className={`${styles.stringDate} ${styles.input}`}
              onClick={() => setCalendarVisible(!calendarVisible)}
            >
              {date.toLocaleDateString("de-DE", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>
          <div
            className={`${styles.dflexCol} ${styles.calendar} ${styles[calendarVisible ? "" : "hideElement"]}`}
          >
            <Calendar
              onDateChangeAction={setDate}
              dateToday={new Date()}
              initialDate={date}
            ></Calendar>
          </div>
          <div className={`${styles.dflexRow} ${styles.timePicker}`}>
            <FontAwesomeIcon size="1x" icon={faClock} />
            <input
              className={`${styles.input} ${styles.time} ${styles.hours}`}
              id="timeHours"
              name="hour"
              type="text"
              value={date.getHours().toString().padStart(2, "0")}
              maxLength={3}
              pattern="[0-9]*"
              onChange={handleChangeHour}
            ></input>
            :
            <input
              className={`${styles.input} ${styles.time} ${styles.minutes}`}
              id="timeMinutes"
              name="minute"
              type="text"
              value={date.getMinutes().toString().padStart(2, "0")}
              maxLength={3}
              pattern="[0-9]*"
              onChange={handleChangeMinute}
            ></input>
            <span className={styles.textTime}>Uhr</span>
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
            value={lists.find((list) => list.id === idSelectedList)?.title}
            onChange={handleChangeSelectedList}
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
            onChangePriorityAction={setPriority}
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
          disabled={false}
          buttonType={"button"}
          onClickAction={(): void => setShowModalConfirmDelete(true)}
          text="löschen"
          styleType="delete"
        />
        {showModalConfirmDelete && (
          <Modal
            onClose={(): void => {
              setShowModalConfirmDelete(false);
            }}
            onConfirm={deleteTask}
            title={"Möchten Sie diese Aufgabe wirklich löschen?"}
            yes={"Ja"}
            no={"Nein"}
          />
        )}
        <Button
          buttonType="submit"
          disabled={title.trim() === "" || title === ""}
          text="speichern"
          styleType="save"
        />
      </div>
    </form>
  );
}
