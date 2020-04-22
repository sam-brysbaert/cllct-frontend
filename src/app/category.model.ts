interface CategoryJson {
  categoryId: number;
  name: string;
  children: CategoryJson[];
}
export class Category {
  constructor(
    private _name: string,
    private _children = new Array<Category>(),
    private _categoryId: number
  ) {}

  static fromJSON(json: CategoryJson): Category {
    const cat = new Category(
      json.name,
      json.children.map(Category.fromJSON),
      json.categoryId
    );
    return cat;
  }
}
