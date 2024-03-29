import { scheduleJob } from 'node-schedule';
import { pipe, wrap, map } from '@qiyuor2/utils';
import type BotContext from './context';
import { Middleware } from '@/types/application';
import { MessageChain } from '@/types/message';
import { wrapArray } from '@/utils';

type Command = string | RegExp | (() => string) | (() => RegExp)
type Commands = Command | Array<Command>
type Handler = (context: BotContext) => string | MessageChain | void | Promise<MessageChain | string | void>

/**
 * 解析命令
 */
function command(wrapCommand: Command) {
  return typeof wrapCommand === 'function' ? wrapCommand() : wrapCommand;
}

/**
 * 判断 command 和 message 是否相等
 */
function commandEq(message: string) {
  return (c: ReturnType<typeof command>) =>
    typeof c === 'string' ? c === message : c.test(message);
}

export function define(commands: Commands, handler: Handler): Middleware {
  return async (ctx, next) => {
    const willExec = ctx.message?.plain?.split(' ')?.[0] ?? '';

    const unwrapCommands = pipe<string[], Commands>(wrap, map(command));

    if (unwrapCommands(commands).some(commandEq(willExec))) {
      console.log(`[y-bot] ::${willExec}::`);

      const result = await handler(ctx);
      result && ctx.message?.reply(result);
    }

    await next();
  };
}

/**
 * 注册定时任务，建议不要在监听回复时使用，会导致重复注册
 */
export function defineTimer(cron: string | string[], handler: Handler): Middleware {
  console.log('[y-bot] timer register')
  return async (ctx, next) => {
    wrapArray(cron).forEach(c => {
      scheduleJob(c, () => {
        handler(ctx);
      });
    });

    await next();
  };
}
