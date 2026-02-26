import { Priority } from "../_models/task";

export function getPriority(id: number) {
  return Priority[id];
}