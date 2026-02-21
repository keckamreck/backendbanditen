import { Group } from "../_types/group.ts";
import { generateGroup } from "./demo.ts";

export function getGroup(slug: string) {
  return generateGroup();
}