import { Mirai } from 'mirai-ts';
import { BotMessage, MessageChain } from './message';

export type BotHandler = (...args: any[]) => MessageChain | void | undefined | Promise<MessageChain | void | undefined>;

export type BotContext<T = Record<string, any>> = {
  mirai: Mirai
} & T

export interface IBotPlugin {
  getKeywords: () => string[];
  /**
   * Entry统一调用该方法处理Plugin
   */
  main(message: BotMessage, context: Record<string, any>): ReturnType<BotHandler>
}
