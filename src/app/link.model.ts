interface LinkJson {
  linkId: number;
  name: string;
  path: string;
  categoryId: number;
}

export class Link {
  constructor(
    public linkId: number,
    public name: string,
    public path: string,
    public categoryId: number
  ) {}

  static fromJSON(json: LinkJson): Link {
    const link = new Link(json.linkId, json.name, json.path, json.categoryId);
    return link;
  }
}
