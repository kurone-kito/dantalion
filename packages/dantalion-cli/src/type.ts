export interface CommandOptions {
  readonly lang?: string | undefined;
}

export interface Command {
  readonly validate: (arg?: string) => string | undefined;
  readonly getDescriptionAsync: (
    arg?: string,
    options?: CommandOptions,
  ) => string | Promise<string>;
  readonly getObject: (arg?: string) => unknown | Promise<unknown>;
  readonly alias: string;
  readonly command: string;
  readonly description: string;
}
