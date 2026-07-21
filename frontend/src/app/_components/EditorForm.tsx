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
import { Button } from "@/app/_components/Buttons";
import { ChangeEvent, FormEvent, useState } from "react";
import { List } from "@/app/_models/list";
import { Priority, TaskFrontendWithoutId } from "@/app/_models/task";
import { useRouter } from "next/navigation";
import { Modal } from "@/app/_components/modal";

interface EditorFormProps {
  initialValues: TaskFrontendWithoutId;
  lists: List[];
  saveAction: (task: TaskFrontendWithoutId) => Promise<true | false>;
  deleteButtonVisible: boolean;
  deleteAction?: () => Promise<true | false>;
}

export default function EditorForm({
  initialValues,
  lists,
  deleteButtonVisible,
  saveAction,
  deleteAction,
}: EditorFormProps) {
  const router = useRouter();
  const [showEditor, setShowEditor] = useState<boolean>(true);
  const [dateToday] = useState<Date>(new Date());
  const [title, setTitle] = useState<string>(initialValues.title);
  const [enterDeadline, setEnterDeadline] = useState<boolean>(
    initialValues.deadline !== null,
  );
  const [calendarVisible, setCalendarVisible] =
    useState<boolean>(enterDeadline);
  const [date, setDate] = useState<Date>(
    initialValues.deadline === null
      ? new Date(
          dateToday.getFullYear(),
          dateToday.getMonth(),
          dateToday.getDate() + 1,
          12,
          30,
        )
      : initialValues.deadline,
  );
  const [priority, setPriority] = useState<Priority>(initialValues.priority);
  const [idSelectedList, setIdSelectedList] = useState<string>(
    initialValues.listId,
  );
  const [notes, setNotes] = useState<string>(
    initialValues.note === null ? "" : initialValues.note,
  );
  const [showModalConfirmGoBack, setShowModalConfirmGoBack] =
    useState<boolean>(false);
  const [showModalConfirmDelete, setShowModalConfirmDelete] =
    useState<boolean>(false);

  function getCurrentValues(): TaskFrontendWithoutId {
    return {
      title: title.trim(),
      deadline: enterDeadline ? date : null,
      listId: idSelectedList,
      priority: priority,
      note: notes.trim().length > 0 ? notes.trim() : null,
      done: initialValues.done,
    };
  }

  function checkInputTime(input: string, oldValue: string): string {
    let newValue: string = input.replace(/\D/g, "");
    if (newValue.length === 3) {
      const newValueArray: string[] = newValue.split("");
      const oldValueArray = oldValue.split("");
      if (
        oldValueArray[0] === newValueArray[0] &&
        oldValueArray[1] === newValueArray[1]
      ) {
        newValue = `${newValueArray[1]}${newValueArray[2]}`;
      } else {
        newValue = `${newValueArray[0]}${newValueArray[1]}`;
      }
    }
    if (Number.isNaN(parseInt(newValue))) {
      return "00";
    } else {
      return newValue;
    }
  }

  function handleChangeHour(e: ChangeEvent<HTMLInputElement>): void {
    let newHour: string = checkInputTime(
      e.target.value,
      date.getHours().toString().padStart(2, "0"),
    );
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
    let newMinute: string = checkInputTime(
      e.target.value,
      date.getMinutes().toString().padStart(2, "0"),
    );
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

  function handleChangeSelectedList(e: ChangeEvent<HTMLSelectElement>): void {
    const selectedList: List | undefined = lists.find(
      (list: List): boolean => list.id === e.target.value,
    );
    if (selectedList !== undefined) {
      setIdSelectedList(selectedList.id);
    }
  }

  async function saveTask(): Promise<void> {
    const currentValues: TaskFrontendWithoutId = getCurrentValues();
    if (JSON.stringify(currentValues) === JSON.stringify(initialValues)) {
      handleBackNavigation(initialValues.listId);
    } else {
      setShowEditor(false);
      const result: true | false = await saveAction(currentValues);
      if (result) {
        handleBackNavigation(idSelectedList);
      } else {
        setShowEditor(true);
      }
    }
  }

  async function deleteTask(): Promise<void> {
    if (deleteAction !== undefined) {
      setShowEditor(false);
      const result: true | false = await deleteAction();
      if (result) {
        handleBackNavigation(initialValues.listId);
      } else {
        setShowEditor(true);
      }
    }
  }

  function handleBackNavigation(listIdToNavigate: string): void {
    if (initialValues.done) {
      router.push(`/archive/${listIdToNavigate}`);
    } else {
      router.push(`/list/${listIdToNavigate}`);
    }
  }

  function handleClickOnBackButton(): void {
    const currentValues: TaskFrontendWithoutId = getCurrentValues();
    if (JSON.stringify(currentValues) === JSON.stringify(initialValues)) {
      handleBackNavigation(initialValues.listId);
    } else {
      setShowModalConfirmGoBack(true);
    }
  }
  if (showEditor) {
    return (
      <form
        className={styles.form}
        onSubmit={(e: FormEvent<HTMLFormElement>): void => {
          e.preventDefault();
          saveTask();
        }}
      >
        <div className={`${styles.dflexRow} ${styles.titleComponent}`}>
          <button
            type="button"
            className={styles.buttonGoBack}
            onClick={(): void => handleClickOnBackButton()}
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
              onConfirm={(): void => handleBackNavigation(initialValues.listId)}
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
              onClick={(): void => {
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
                onClick={(): void => setCalendarVisible(!calendarVisible)}
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
              value={idSelectedList}
              onChange={handleChangeSelectedList}
            >
              {lists.map((list: List) => (
                <option
                  className={styles.selectedList}
                  key={list.id}
                  value={list.id}
                >
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
            onChange={(e: ChangeEvent<HTMLTextAreaElement>): void =>
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
  } else {
    return <div style={{ margin: "20px" }}>Loading...</div>;
  }
}
