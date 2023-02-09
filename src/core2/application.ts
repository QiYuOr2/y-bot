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
  #middleware: Middleware[];
  #compose;
  #context;

  constructor(mirai: Mirai, options: CreateAppOptions) {
    this.#qq = options.qq;
    this.#middleware = [];
    this.#compose = compose;
    this.#context = new BotContext(mirai);
  }

  use(fn: Middleware) {
    this.#middleware.push(fn);
    return this;
  }

  createContext(message: MessageType.ChatMessage): BotContext {
    const context = Object.create(this.#context);

    context.message = message;

    return context;
  }

  async handleMessage(context: BotContext, fn: Middleware) {
    await fn(context);
  }

  async listen() {
    const fn = this.#compose(this.#middleware);
    fn(this.#context);

    await this.#context.mirai.link(this.#qq);

    this.#context.mirai.on('message', (message) => {
      this.handleMessage(this.createContext(message), fn);
    });

    this.#context.mirai.listen();
  }
}

export function createApp(options: CreateAppOptions) {
  const mirai = new Mirai(options.settings);

  return new Application(mirai, options);
}
