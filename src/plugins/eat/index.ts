import { Message } from 'mirai-ts';
import { noop, readCookMenuConfig } from '@/utils';
import { define } from '@/core/define';
import { MessageChain } from '@/types/message';

// 缓存判断请求次数，防止次数太多
const cache: Record<string | number, number> = {};

export const eat = define(['.eat', '/eat', '今天吃啥', '今天吃什么'], (ctx) => {
  const id = ctx.message!.sender.id;
  !cache[id] ? (cache[id] = 1) : (cache[id] = cache[id] + 1);
  const foodList = readCookMenuConfig().list;

  if (cache[id] > 5) {
    setTimeout(() => {
      try {
        Reflect.deleteProperty(cache, id);
      } catch (error) {
        noop();
      }
    }, 1000 * 60);
    return [ctx.atSender(), Message.Plain('呜~太频繁了，请一分钟后再来吧')] as MessageChain;
  }

  return [ctx.atSender(), Message.Plain(`今天吃【${foodList[Math.floor(Math.random() * foodList.length)]}】吧！`)] as MessageChain;
});
