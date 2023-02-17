import type BotContext from '../core/context';

export type Middleware = (context: BotContext, next: () => Promise<void>) => void | Promise<void>
