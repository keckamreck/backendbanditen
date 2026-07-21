export enum Sort {
  dueDate = "Fälligkeitsdatum",
  priority = "Priorität",
  Alphabetisch = "Alphabetisch",
}

export interface List {
  id: string;
  title: string;
  isFavorite?: boolean;
  categoryId?: string | null;
}

export interface ListBackend {
  id: string;
  title: string;
  isFavorite?: boolean;
  userId: string;
  categoryId?: string | null;
}
