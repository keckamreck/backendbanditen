"use client";

import { ButtonHTMLAttributes } from "react";

export function DeleteButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button id="delete-button" type="button" onClick={props.onClick}>Delete</button>
  );
}