import "reflect-metadata";
import { ReflectSkip } from "../../common/constants";

export function Skip<TFunction extends Function>(target: TFunction): void | TFunction {
  Reflect.defineMetadata(ReflectSkip, true, target);

  return target;
}
