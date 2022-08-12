import "reflect-metadata";
import { ReflectHelpKey } from "../common/constants";
import { CommandCenter } from "../core/command-center";

type CommandOptions = { description?: string; notUseName?: boolean };

export function Command(name: string, options?: CommandOptions): ClassDecorator {
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

    const commandHelper = Reflect.getMetadata(ReflectHelpKey, target);
    const optionsHelper: { options: Map<string, any> } = Reflect.getMetadata(ReflectHelpKey, target.prototype);

    const baseName = commandHelper.notUseName ? "" : commandHelper.name;

    Array.from(optionsHelper.options.keys()).forEach((k) => {
      const helpName = baseName ? `${baseName} ${k}` : k;
      const helpDescription = optionsHelper.options.get(k).description;
      CommandCenter.getInstance<CommandCenter>().registHelp(helpName, helpDescription);
    });

    console.log();
    CommandCenter.getInstance<CommandCenter>().registCommand(target, name);
    return target;
  };
}
