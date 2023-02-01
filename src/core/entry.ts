import { Mirai } from 'mirai-ts';
import { BotMessage, MessageChain, ReceiveMessage } from '../types/message';
import { BotContext, IBotPlugin } from '../types/bot-plugin';
import * as PluginModules from '../plugins';
import { isRegExpString, isUndefined } from '../utils';
import receiveHandler from './receive-handler';

export default class Entry {
  // eslint-disable-next-line no-use-before-define
  static instance: Entry;
  static create(mirai: Mirai) {
    if (!this.instance) {
      this.instance = new Entry(mirai);
    }
    return this.instance;
  }

  #triggerKeywords: string[] = [];
  plugins: IBotPlugin[] = [];
  message!: BotMessage;

  context!: BotContext;

  constructor(mirai: Mirai) {
    this.context = { mirai };
    this.loadPlugins();
  }

  use(middleware: (context: Record<string, any>) => void) {
    middleware(this.context);
    return this;
  }

  receive(message: ReceiveMessage) {
    this.message = receiveHandler(message, this.#triggerKeywords);
    return this;
  }

  loadPlugins() {
    this.plugins = Object.values(PluginModules).map((P) => new P());
    this.#triggerKeywords = this.plugins.map((ins) => ins.getKeywords()).flat();
  }

  async toReplyMessage() {
    if (!this.message.hasKeywords) {
      return;
    }

    let result;
    for (const plugin of this.plugins) {
      const eq = (value: string) => {
        if (isRegExpString(value)) {
          const reg = new RegExp(value.slice(1, value.length - 1));
          return reg.test(this.message.keywords ?? '');
        }
        return value === this.message.keywords;
      };

      if (plugin.getKeywords().some(eq)) {
        result = await plugin.main(this.message, this.context);
      }
    }

    if (isUndefined(result)) {
      return;
    }

    return result as MessageChain;
  }
}
