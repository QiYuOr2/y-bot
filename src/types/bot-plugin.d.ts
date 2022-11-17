import { toMessageChain } from 'mirai-ts';
import { BotMessage } from './message';

export interface IBotPlugin {
  getKeywords: () => string[];
  /**
   * Entry统一调用该方法处理Plugin
   */
  main(message: BotMessage, context: Record<string, any>): ReturnType<typeof toMessageChain> | undefined | Promise<ReturnType<typeof toMessageChain> | undefined>;
}
