import { Message } from 'mirai-ts';
import { IBotPlugin } from '../types/bot-plugin';
import { BotMessage, MessageChain } from '../types/message';
import { isString, isUndefined } from '../utils';

// eslint-disable-next-line no-unused-vars
type Handler = (...args: any[]) => MessageChain | undefined | Promise<MessageChain | undefined>;

export default class Plugin implements IBotPlugin {
  message!: Required<BotMessage>;
  main(message: Required<BotMessage>) {
    this.message = message;

    if (message.keywordsRegExp) {
      return this.exec(message.keywordsRegExp, [...message.args, message.matchKeywords]);
    }

    return this.exec(message.keywords, message.args);
  }

  #triggerKeywords: string[] = [];
  getKeywords() {
    return this.#triggerKeywords;
  }

  #handlerMap: Map<string, Handler> = new Map();

  #lazyMethods: Function[] = [];

  /**
   * 惰性设置触发词
   * @param keywords
   * @returns
   */
  #set(keywords: string | RegExp | (string | RegExp)[]) {
    return () => {
      const _keywords = (Array.isArray(keywords) ? keywords : [keywords]).map((k) => (isString(k) ? k : `/${k.source}/`));
      this.#triggerKeywords.push(..._keywords);
      return _keywords;
    };
  }

  /**
   * 设置触发词
   * @param keywords
   * @returns
   */
  set(keywords: string | RegExp | (string | RegExp)[]) {
    this.#lazyMethods.push(this.#set(keywords));
    return this;
  }

  /**
   * 设置触发时的处理函数
   * @param handler
   * @returns
   */
  action(handler: Handler) {
    const _set = this.#lazyMethods.pop();

    if (isUndefined(_set)) {
      console.error(new Error('未设置触发词').message);
      return;
    }

    const keywords: string[] = _set();

    keywords.forEach((keyword) => {
      this.#handlerMap.set(keyword, handler);
    });
  }

  atReceive() {
    const id = this.message.senderQQ;
    const fromFriend = this.message.type === 'FriendMessage';
    
    return fromFriend ? Message.Plain('') : Message.At(id);
  }

  exec(keyword: string | RegExp, args: any[] = []) {
    const handler = this.#handlerMap.get(keyword.toString());

    if (isUndefined(handler)) {
      console.error(new Error('未找到触发函数').message);
      return;
    }

    return handler(...args);
  }
}
