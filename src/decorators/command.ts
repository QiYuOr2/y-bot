import 'reflect-metadata';
import { ReflectHelpKey } from '../common/constants';
import { CommandCenter } from '../core/command-center';

type CommandOptions = { description?: string; notUseName?: boolean };

export function Command(
  name: string,
  options?: CommandOptions
): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(
      ReflectHelpKey,
      {
        name,
        description: options?.description,
        notUseName: options?.notUseName ?? false,
      },
      target
    );
    CommandCenter.getInstance<CommandCenter>().registCommand(target, name);
    return target;
  };
}
