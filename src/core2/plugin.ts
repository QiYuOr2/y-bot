import { Middleware } from '../types/application';
import { MessageChain } from '../types/message';
import BotContext from './context';

type Commands = string | RegExp | (string | RegExp)[] | (() => string | RegExp | (string | RegExp)[])
type Handler = (context: BotContext) => string | MessageChain | void | Promise<MessageChain | string | void>

export function define(commands: Commands, handler: Handler): Middleware {
  return async (ctx, next) => {
    await handler(ctx);

    // if (type === 'reply') {
    //   result && ctx.message?.reply(result);
    // }

    await next();
  };
}

define('.a', () => {});
