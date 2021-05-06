export interface Command {
  readonly getObject: (
    ...arg: readonly unknown[]
  ) => unknown | Promise<unknown>;
  readonly alias: string;
  readonly command: string;
  readonly description: string;
}
