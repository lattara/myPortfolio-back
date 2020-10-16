export class ToolboxItem {
    id!: number;
    name!: string;
    shortcut!: string;
    masterLevel!: number;

    constructor(input: ToolboxItem) {
      Object.assign(this, input);
  }
  }
