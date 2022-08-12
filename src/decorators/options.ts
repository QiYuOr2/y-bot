import "reflect-metadata";
import { ReflectCommandMap, ReflectHelpKey } from "../common/constants";

export function Options(name: string, description: string): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    const helpOptions: Record<string, any> = Reflect.getMetadata(ReflectHelpKey, target) || {};
    const commandMap: Record<string, any> = Reflect.getMetadata(ReflectCommandMap, target) || {};

    const options = {
      name,
      description,
      funcName: propertyKey,
    };

    if (!helpOptions.options) {
      helpOptions.options = new Map();
    }

    helpOptions.options.set(name, options);

    commandMap[name] ? (commandMap[name] = propertyKey) : {};

    Reflect.defineMetadata(ReflectHelpKey, helpOptions, target);
    Reflect.defineMetadata(ReflectCommandMap, commandMap, target);
  };
}
