import { Message } from 'mirai-ts';
import { noop } from '../common/utils';

const cache: Record<string | number, number> = {};
export const rollFood = (foodList: string[]) => {
  return (options: any[]) => {
    !cache[options[0]]
      ? (cache[options[0]] = 1)
      : (cache[options[0]] = cache[options[0]] + 1);

    if (cache[options[0]] > 5) {
      setTimeout(() => {
        try {
          Reflect.deleteProperty(cache, options[0]);
        } catch (error) {
          noop();
        }
      }, 1000 * 60);
      return [
        Message.At(options[0]),
        Message.Plain('呜~坏掉了，请一分钟后再来吧'),
      ];
    }

    return [
      Message.At(options[0]),
      Message.Plain(
        `今天吃【${foodList[Math.floor(Math.random() * foodList.length)]}】吧！`
      ),
    ];
  };
};
