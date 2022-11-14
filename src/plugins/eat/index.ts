import { Message } from 'mirai-ts';
import Plugin from '../../core/plugin';
import { noop, readCookMenuConfig } from '../../utils';

// 缓存判断请求次数，防止次数太多
const cache: Record<string | number, number> = {};

export class EatPlugin extends Plugin {
  constructor() {
    super();

    this.set(['.eat', '/eat', '今天吃啥']).action(() => {
      const id = this.message.senderQQ;
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
        return [this.atReceive(), Message.Plain('呜~太频繁了，请一分钟后再来吧')];
      }

      return [this.atReceive(), Message.Plain(`今天吃【${foodList[Math.floor(Math.random() * foodList.length)]}】吧！`)];
    });
  }
}
