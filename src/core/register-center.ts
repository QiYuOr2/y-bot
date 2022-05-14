import { ReflectHelpKey } from '../common/constants';

export type Handler = {
  name: string;
  description?: string;
  notUseName: boolean;
  options: Map<string, any>;
};

export class RegisterCenter {
  static ins: RegisterCenter;
  static getInstance<T extends RegisterCenter>() {
    if (!this.ins) {
      this.ins = new this();
    }
    return this.ins as T;
  }

  services = new Map<string, any>();
  instances = new Map<string, unknown>();
  handlers = new Map<string, Handler>();

  regist(constructor: Function, alias?: string) {
    const name = alias ?? constructor.name;
    if (this.services.has(name)) {
      console.warn('重复注册 ', name);
    }
    this.services.set(name, constructor);
  }

  get(name: string) {
    if (this.instances.has(name)) {
      return this.instances.get(name)!;
    }
    const service = this.services.get(name);

    if (!service) {
      throw '未注册: ' + name;
    }
    const ins = new service();

    const staticHelpInfo = Reflect.getMetadata(ReflectHelpKey, service);
    if (staticHelpInfo) {
      const instanceHelpInfo = Reflect.getMetadata(ReflectHelpKey, ins);
      const helpInfo = { ...staticHelpInfo, ...instanceHelpInfo };
      Reflect.defineMetadata(ReflectHelpKey, helpInfo, ins);

      helpInfo.options.forEach((item: any) => {
        helpInfo.notUseName
          ? this.handlers.set(`${item.name}`, helpInfo)
          : this.handlers.set(`${helpInfo.name}_${item.name}`, helpInfo);
      });
    }

    this.instances.set(name, ins);
    return ins;
  }
}
