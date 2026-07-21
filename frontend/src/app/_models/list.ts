export enum Sort {
  dueDate = "Fälligkeitsdatum",
  priority = "Priorität",
  Alphabetisch = "Alphabetisch",
}

export interface List {
  id: number;
  title: string;
  isFavorite?: boolean;
  category?: string;
}

export interface ListReal {
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
  categoryId?: string  | null;
}