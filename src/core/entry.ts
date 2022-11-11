import { BotMessage, MessageChain, ReceiveMessage } from '../types/message';
import { IBotPlugin } from '../types/bot-plugin';
import * as PluginModules from '../plugins';
import receiveHandler from './receive-handler';
import { isRegExpString, isUndefined } from '../utils';

export default class Entry {
  static instance: Entry;
  static create() {
    if (!this.instance) {
      this.instance = new Entry();
    }
    return this.instance;
  }

  #triggerKeywords: string[] = [];
  plugins: IBotPlugin[] = [];
  message!: BotMessage;
  constructor() {
    this.loadPlugins();
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
        result = await plugin.main(this.message);
      }
    }

    if (isUndefined(result)) {
      return;
    }

    return result as MessageChain;
  }
}
