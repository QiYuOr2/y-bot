import 'reflect-metadata';
import { ServiceCenter } from '../core/service-center';

export function Inject(alias?: string): PropertyDecorator {
  return (target, propertyKey) => {
    const classConstructor = Reflect.getMetadata('design:type', target, propertyKey);
    const name = alias ?? classConstructor.name;
    const instance = ServiceCenter.getInstance().get(name);
    (target as any)[propertyKey] = instance;
    return instance;
  };
}
