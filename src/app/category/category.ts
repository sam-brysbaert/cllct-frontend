export interface Category {
  name: string;
  id: number;
  children?: Category[];
  color: string;
}

export interface FlatCategory extends Category {
  name: string;
  id: number;
  color: string;
  level: number;
  parentId: number;
}
