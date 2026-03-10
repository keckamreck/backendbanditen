"use client";

import Editor from "@/app/_components/editor";
import { getLists } from "@/app/_lib/demo";
import { Priority } from "@/app/_models/task";

export default function Page() {
  function handleSave() {
    console.log("save");
  }

  function handleDelete() {
    console.log("delete");
  }

  return (
    <Editor
      defaultTitle={"test"}
      defaultEnterDeadline={true}
      defaultDate={new Date(2026, 2, 11)}
      defaultTimeHours={14}
      defaultTimeMinutes={15}
      lists={getLists()}
      defaultIndexSelectedList={2}
      defaultSelectedPriority={Priority.Medium}
      defaultNotes={"Das hier ist eine Notiz, hoffentlich funktioniert es"}
      saveAction={() => handleSave}
      deleteButtonVisible={true}
      deleteAction={() => handleDelete}
    ></Editor>
  );
}
