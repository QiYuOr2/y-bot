import { Message } from 'mirai-ts';
import { scheduleJob } from 'node-schedule';
import { BotContext, BotHandler, IBotPlugin } from '../types/bot-plugin';
import { BotMessage, Member } from '../types/message';
import { isString, isUndefined } from '../utils';

export default class Plugin implements IBotPlugin {
  constructor() {
    this.registerTimers();
  }

  message!: Required<BotMessage>;
  context!: BotContext<{ memberList: Member[] }>;

  main(message: Required<BotMessage>, context: BotContext<{ memberList: Member[] }>) {
    this.message = message;
    this.context = context;

    if (message.keywordsRegExp) {
      return this.exec(message.keywordsRegExp, [...message.args, message.matchKeywords]);
    }

    return this.exec(message.keywords, message.args);
  }

  #triggerKeywords: string[] = [];
  getKeywords() {
    return this.#triggerKeywords;
  }

  #handlerMap: Map<string, BotHandler> = new Map();

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
  set(keywords: string | RegExp | (string | RegExp)[]): Pick<Plugin, 'action' | 'timer'> {
    this.#lazyMethods.push(this.#set(keywords));
    return this;
  }

  #cacheTimerRule = '';
  #timerMap: Map<string, BotHandler> = new Map();

  /**
   * 设置定时任务
   * @param rule cron 字符串
   */
  timer(rule: string): Pick<Plugin, 'action'> {
    this.#cacheTimerRule = rule;
    return this;
  }

  /**
   * 设置触发时的处理函数
   * @param handler
   * @returns
   */
  action(handler: BotHandler) {
    // 存在 #cacheTimerRule 时，说明需要注册定时任务
    if (this.#cacheTimerRule) {
      this.#timerMap.set(this.#cacheTimerRule, handler);

      // 清除缓存的时间规则，防止错误注册
      this.#cacheTimerRule = '';

      return;
    }

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

  /**
   * 注册定时器
   */
  registerTimers() {
    if (this.#timerMap.size > 0) {
      this.#timerMap.forEach((handler, rule) => {
        scheduleJob(rule, () => {
          handler();
        });
      });
    }
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
