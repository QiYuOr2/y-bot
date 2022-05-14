import { ReflectHelpKey } from '../common/constants';
import { RegisterCenter } from './register-center';

export class CommandCenter extends RegisterCenter {
  helpList: string[] = [];

  registCommand(constructor: Function, alias?: string): void {
    this.regist(constructor, alias);
    this.get(alias ?? constructor.name);
  }

  registHelp(name: string, description: string) {
    this.helpList.push(`/${name} [${description}]`);
  }

  async exec(name: string, optionKey: string, ...args: any[]) {
    const ins = this.get(name);
    const { funcName } = Reflect.getMetadata(ReflectHelpKey, ins).options.get(
      optionKey
    );

    const result = await ins[funcName](...args);
    return result;
  }
}
