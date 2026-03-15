import { getLists } from "@/app/_lib/demo";

export enum Sort {
  Fälligkeitsdatum = "Fälligkeitsdatum",
  Priorität = "Priorität",
  Alphabetisch = "Alphabetisch",
}

export interface List {
  id: number;
  title: string;
  isFavourite? : boolean;
  category?: string;  
};