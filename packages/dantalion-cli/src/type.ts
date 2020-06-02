export interface Command {
  action: (...args: string[]) => Result | Promise<Result>;
  alias: string;
  command: string;
  description: string;
}

export type Result = object | undefined;
