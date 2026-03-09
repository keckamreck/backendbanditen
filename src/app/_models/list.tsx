import { generateList, generateTasks } from '@/app/_lib/demo';

export interface List{
  id: number;
  title: string;
  isFavourite? : boolean;
};

export function getList(id: number) {
  return generateList(id);
}

export function getTasks(listKey: number) {
  return generateTasks(listKey);
}