import { IBotPlugin } from '../types/bot-plugin';
import { BotMessage, MessageChain } from '../types/message';
import { isString, isUndefined } from '../utils';

type Handler = (...args: any[]) => MessageChain | undefined;

export default class Plugin implements IBotPlugin {
  message!: Required<BotMessage>;
  main(message: Required<BotMessage>) {
    this.message = message;

    if (message.keywordsRegExp) {
      return this.exec(message.keywordsRegExp, [...message.args, message.matchKeywords]);
    }

    return this.exec(message.keywords, message.args);
  }

  _triggerKeywords: string[] = [];
  getKeywords() {
    return this._triggerKeywords;
  }

  _handlerMap: Map<string, Handler> = new Map();

  _lazyMethods: Function[] = [];

  /**
   * 惰性设置触发词
   * @param keywords
   * @returns
   */
  _set(keywords: string | RegExp | (string | RegExp)[]) {
    return () => {
      const _keywords = (Array.isArray(keywords) ? keywords : [keywords]).map((k) => (isString(k) ? k : `/${k.source}/`));
      this._triggerKeywords.push(..._keywords);
      return _keywords;
    };
  }

  /**
   * 设置触发词
   * @param keywords
   * @returns
   */
  set(keywords: string | RegExp | (string | RegExp)[]) {
    this._lazyMethods.push(this._set(keywords));
    return this;
  }

  /**
   * 设置触发时的处理函数
   * @param handler
   * @returns
   */
  action(handler: Handler) {
    const _set = this._lazyMethods.pop();

    if (isUndefined(_set)) {
      console.error(new Error('未设置触发词').message);
      return;
    }

    const keywords: string[] = _set();

    keywords.forEach((keyword) => {
      this._handlerMap.set(keyword, handler);
    });
  }

  exec(keyword: string | RegExp, args: any[] = []) {
    const handler = this._handlerMap.get(keyword.toString());

    if (isUndefined(handler)) {
      console.error(new Error('未找到触发函数').message);
      return;
    }

    return handler(...args);
  }
}
