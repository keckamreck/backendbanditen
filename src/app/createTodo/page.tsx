"use client";

import Editor from "@/app/_components/editor";
import { getLists } from "@/app/_lib/demo";
import { Priority } from "@/app/_models/task";
import { List } from "@/app/_models/list";
import { saveTodo } from "@/app/_models/task";

export default function Page() {
  const dateToday = new Date();
  const lists: List[] = getLists();
  function handleSave(todo: saveTodo): void {
    console.log(todo);
  }

  return (
    <Editor
      defaultTitle={""}
      defaultEnterDeadline={false}
      defaultDate={
        new Date(
          dateToday.getFullYear(),
          dateToday.getMonth(),
          dateToday.getDate() + 1,
        )
      }
      defaultTimeHours={12}
      defaultTimeMinutes={30}
      lists={lists}
      defaultIndexSelectedList={0}
      defaultSelectedPriority={Priority.Low}
      defaultNotes={""}
      saveAction={() => handleSave}
      deleteButtonVisible={false}
    ></Editor>
  );
}
