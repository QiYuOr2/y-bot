import type BotContext from '../core2/context';

export type Middleware = (context: BotContext, next: () => Promise<void>) => void | Promise<void>
