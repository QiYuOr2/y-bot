import { Middleware } from '../types/application';
import { MessageChain } from '../types/message';
import BotContext from './context';

type PluginType = 'reply' | 'timer'

type PluginOptions = {
  [x: string]: any
  type: PluginType,
  commands: string | RegExp | (string | RegExp)[] | (() => string | RegExp | (string | RegExp)[])
  handler: (context: BotContext) => string | MessageChain | void | Promise<MessageChain | string | void>
}

export function definePlugin(options: PluginOptions): Middleware {
  return async (ctx, next) => {
    const result = await options.handler(ctx);

    if (options.type === 'reply') {
      result && ctx.message?.reply(result);
    }
    await next();
  };
}
