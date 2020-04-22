export class Link {
  public id: number;
  public website: string;
  public name: string;

  constructor(id: number, website: string, name: string) {
    this.id = id;
    this.website = website;
    this.name = name;
  }
}
