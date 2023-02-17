import { Middleware } from '../types/application';
import { MessageChain } from '../types/message';
import type BotContext from './context';

type Command = string | RegExp | (() => string) | (() => RegExp)
type Commands = Command | Array<Command>
type Handler = (context: BotContext) => string | MessageChain | void | Promise<MessageChain | string | void>

/**
 * 解析命令
 */
function command(wrapCommand: Command) {
  if (typeof wrapCommand === 'function') {
    return wrapCommand();
  }
  return wrapCommand;
}

/**
 * 判断 command 和 message 是否相等
 */
function commandEq(message: string) {
  return (c: ReturnType<typeof command>) => {
    if (typeof c === 'string') {
      return c === message;
    }
    return c.test(message);
  };
}

export function define(commands: Commands, handler: Handler): Middleware {
  return async (ctx, next) => {
    const result = await handler(ctx);

    const willRegisterCommands = Array.isArray(commands) ? commands : [commands];

    willRegisterCommands.map(command).some(commandEq(ctx.message?.plain ?? '')) &&
      result && ctx.message?.reply(result);

    await next();
  };
}
