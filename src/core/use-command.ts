// import {} from

interface ICommandConstructor {
  new (): ICommand;
}

export interface ICommand {}

function createCommand(ctor: ICommandConstructor) {
  return new ctor();
}

export function useCommand(commands: ICommandConstructor[]) {
  commands.forEach((c) => createCommand(c));
}
