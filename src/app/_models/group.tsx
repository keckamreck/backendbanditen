import { Task } from './task';
import { generateGroup } from '@/app/_lib/demo';

export type Group = {
  slug: string;
  title: string;
  entries: Task[];
};

export function getGroup(slug: string) {
  return generateGroup();
}