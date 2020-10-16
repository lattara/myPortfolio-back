export class Project {
  id!: number;
  name!: string;
  description!: string;
  youtube_link!: string;
  github_link!: string;
  constructor(input: Project) {
    Object.assign(this, input);
  }
}
