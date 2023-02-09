import { Middleware } from '../types/application';
import type BotContext from './context';

export default function compose(middleware: Middleware[]) {
  return (context: BotContext, next?: () => Promise<void>) => {
    const dispatch = async (i: number) => {
      const fn = middleware.length > i ? middleware[i] : next;

      if (fn === undefined) {
        await Promise.resolve();
        return;
      }

      await fn(context, dispatch.bind(null, i + 1));
    };

    return dispatch(0);
  };
}
