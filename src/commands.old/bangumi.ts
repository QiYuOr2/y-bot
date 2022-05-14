import axios from 'axios';
import { Message } from 'mirai-ts';

export const anime = async () => {
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
};
