import { Message } from 'mirai-ts';
import { define } from '@/core/define';

const CanForwardGroup = {
  One: 480557906,
  Two: 708376391
};

export const forward = define('.转发', (ctx) => {
  let target;
  let sender;

  if (ctx.message?.group(CanForwardGroup.One)) {
    target = CanForwardGroup.Two
    sender = CanForwardGroup.One
  } 
  if (ctx.message?.group(CanForwardGroup.Two) ) {
    target = CanForwardGroup.One
    sender = CanForwardGroup.Two
  }


  if (!target || !sender) {
    return;
  }

  ctx.sendGroup([Message.Plain(`隔壁群的 ${(ctx.message?.sender as any)?.memberName || (ctx.message?.sender as any)?.nickname || '未知用户'} 发来一条消息\n`), Message.Plain(ctx.message?.plain.replace('.转发 ', '>') || '')], target);
  ctx.sendGroup([Message.Plain('消息已发送喵')], sender)
});
