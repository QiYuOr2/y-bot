import { Message } from 'mirai-ts';
import { define } from '@/core/define';

const CanForwardGroup = {
  One: 480557906,
  Two: 708376391
};

export const forward = define('.转发', (ctx) => {
  const target = ctx.message?.group(CanForwardGroup.One)
    ? CanForwardGroup.Two
    : ctx.message?.group(CanForwardGroup.Two) ? CanForwardGroup.One : '';

  if (!target) {
    return;
  }

  ctx.sendGroup([Message.Plain(`隔壁群的 ${(ctx.message?.sender as any)?.memberName || (ctx.message?.sender as any)?.nickname || '未知用户'}`), Message.Plain(ctx.message?.plain || '')], target);
});
