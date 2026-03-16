export enum Sort {
  dueDate = "Fälligkeitsdatum",
  priority = "Priorität",
  Alphabetisch = "Alphabetisch",
}

export interface List {
  id: number;
  title: string;
  isFavourite?: boolean;
  category?: string;
}
