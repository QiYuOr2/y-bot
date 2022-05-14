import { Message } from 'mirai-ts';
import { Service } from '../decorators';
import { noop } from '../common/utils';
import axios from 'axios';

const cache: Record<string | number, number> = {};
@Service()
export class CommonService {
  eat(foodList: string[], id: number, fromFriend = false) {
    !cache[id] ? (cache[id] = 1) : (cache[id] = cache[id] + 1);

    const atUser = fromFriend ? Message.Plain('') : Message.At(id);

    if (cache[id] > 5) {
      setTimeout(() => {
        try {
          Reflect.deleteProperty(cache, id);
        } catch (error) {
          noop();
        }
      }, 1000 * 60);
      return [atUser, Message.Plain('呜~坏掉了，请一分钟后再来吧')];
    }

    return [
      atUser,
      Message.Plain(
        `今天吃【${foodList[Math.floor(Math.random() * foodList.length)]}】吧！`
      ),
    ];
  }

  async hitokoto() {
    try {
      const result = await axios.get('https://v1.hitokoto.cn');
      return [
        Message.Plain(
          `${result.data.hitokoto} —— 《${result.data.from || '未知'}》${
            result.data.from_who || ''
          }`
        ),
      ];
    } catch (error) {
      return [Message.Plain('出差错了喵↘')];
    }
  }

  async anime() {
    const { data } = await axios.get('https://api.bgm.tv/calendar', {
      headers: {
        'User-Agent': 'Y-BOT v1.0.0',
      },
    });
    const { weekday, items } = data[new Date().getDay() - 1];
    const list = items
      .filter((item: any) => item.type === 2)
      .map((item: any) => Message.Plain(`${item.name_cn || item.name}\n`));
    return [Message.Plain(`每日放送 [${weekday.cn}]\n=========\n`), ...list];
  }
}
