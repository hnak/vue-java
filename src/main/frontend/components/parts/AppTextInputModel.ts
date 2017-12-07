export default class AppTextInputModel {
  public value: string;
  private subheader: string;
  private label: string;
  private name: string;
  private id: string;

  constructor(subheader: string, label: string, name: string, id: string) {
    this.subheader = subheader;
    this.label = label;
    this.name = name;
    this.id = id;
  }
}
