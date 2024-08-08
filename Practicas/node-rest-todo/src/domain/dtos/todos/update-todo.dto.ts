export class UpdateTodoDto {
  constructor(
    public readonly text: string,
    public readonly completedAt: Date
  ) {}

  get values() {
    const returnObject: { [key: string]: any } = {};

    if (this.text) {
      returnObject.text = this.text;
    }
    if (this.completedAt) {
      returnObject.completedAt = this.completedAt;
    }

    return returnObject;
  }

  public static update(props: {
    [key: string]: any;
  }): [string?, UpdateTodoDto?] {
    const { text, completedAt } = props;
    let newCompletedAt;

    if (!text) return ["Text property is required", undefined];

    if (completedAt) {
      newCompletedAt = new Date(completedAt);

      if (newCompletedAt.toString() === "Invalid Date") {
        return ["CompletedAt must be a valid Date", undefined];
      }
    }

    return [undefined, new UpdateTodoDto(text, completedAt)];
  }
}
