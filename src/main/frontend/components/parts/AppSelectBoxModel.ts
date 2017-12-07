export default class AppSelectInputModel {
  public value: string;
  private subheader: string;
  private items: any[];
  private label: string;
  private name: string;
  private id: string;

  constructor(subheader: string, label: string, items: any[], name: string, id: string) {
    this.subheader = subheader;
    this.label = label;
    this.items = items;
    this.name = name;
    this.id = id;
  }
}
