import { Priority } from "../_types/priority.ts";

export function getPriority(id: number) {
  return Priority[id];
}