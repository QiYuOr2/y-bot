import { Message, MessageType } from 'mirai-ts';
import coupon from './actions/coupon';
import dear from './actions/dear';
import marry from './actions/marry';
import pa from './actions/pa';
import pet from './actions/pet';
import { define } from '@/core/define';
import BotContext from '@/core/context';
import { MessageChain } from '@/types/message';

function getTarget(ctx: BotContext) {
  const targetInPlain = ctx.message?.plain.split(' ')[1];
  return ctx.message?.get('At')?.target ?? targetInPlain;
}

function replyMeme(meme: MessageType.Image | undefined, at?: MessageType.At) {
  if (meme) {
    return (at ? [at, meme] : [meme]) as MessageChain;
  }
}

export const memes = [
  define(['.dear', '亲亲'], async (ctx) =>
    replyMeme(await dear(getTarget(ctx)), ctx.atSender())
  ),
  define(['.pet', '摸摸'], async (ctx) =>
    replyMeme(await pet(getTarget(ctx)), ctx.atSender())
  ),
  define(['.marry', '和我结婚'], async (ctx) =>
    replyMeme(await marry(getTarget(ctx)), ctx.atSender())
  ),
  define(['.coupon', '陪睡'], async (ctx) =>
    replyMeme(await coupon(getTarget(ctx)), ctx.atSender())
  ),
  define(['.pa', '爬'], async (ctx) =>
    replyMeme(await pa(getTarget(ctx)), ctx.atSender())
  )
];
