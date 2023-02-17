import { MessageType, Mirai, MiraiApiHttpSetting } from 'mirai-ts';
import { Middleware } from '../types/application';
import compose from './compose';
import BotContext from './context';

type CreateAppOptions = {
  qq: number;
  settings: MiraiApiHttpSetting;
};

class Application {
  #qq;
  #compose;
  #context;

  constructor(mirai: Mirai, options: CreateAppOptions) {
    this.#qq = options.qq;
    this.#compose = compose;
    this.#context = new BotContext(mirai);
  }

  #createContext(message?: MessageType.ChatMessage): BotContext {
    const context = Object.create(this.#context);

    context.message = message;

    return context;
  }

  async handleMessage(context: BotContext, fn: Middleware) {
    await fn(context, () => Promise.resolve());
  }

  subscribe<T extends 'message' | MessageType.ChatMessageType>(middleware: Middleware[], source?: T) {
    const fn = this.#compose(middleware);
    if (!source) {
      fn(this.#createContext());
      return this;
    }

    this.#context.mirai.on(source, (message) => {
      this.handleMessage(this.#createContext(message), fn);
    });

    return this;
  }

  listen() {
    this.#context.mirai.link(this.#qq).then(() => {
      this.#context.mirai.listen();
    });
  }
}

export function createApp(options: CreateAppOptions) {
  const mirai = new Mirai(options.settings);

  return new Application(mirai, options);
}
