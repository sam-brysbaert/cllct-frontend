interface CategoryJson {
  categoryId: number;
  name: string;
  children: CategoryJson[];
}
export class Category {
  constructor(
    public name: string,
    public children = new Array<Category>(),
    public categoryId: number
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
