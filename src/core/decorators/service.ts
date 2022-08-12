import { ServiceCenter } from "../service-center";

export function Service(alias?: string): ClassDecorator {
  return (target) => {
    ServiceCenter.getInstance().regist(target, alias);
    return target;
  };
}
