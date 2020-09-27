export interface Command {
  action: (...args: string[]) => unknown | Promise<unknown>;
  alias: string;
  command: string;
  description: string;
}
