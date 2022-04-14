import axios from 'axios';
import { Message } from 'mirai-ts';

export const info = async (uid: string) => {
  const { data } = await axios.get(`https://api.bilibili.com/x/space/acc/info?mid=${uid}`);

  const name = `昵称：${data.data.name}`;
  const level = `等级：${data.data.level}${data.data.is_senior_member ? ' 硬核' : ''}`;
  const fansMedal = data.data?.fans_medal?.medal
    ? `粉丝牌：[${data.data.fans_medal.medal.medal_name} ${data.data.fans_medal.medal.level}]`
    : '';
  const vip = data.data.vip ? data.data.vip.label.text : '';
  const pendant =
    data.data.pendant && data.data.pendant.name ? `头像框：${data.data.pendant.name}` : '';
  return [
    Message.Plain(
      [`uid：${uid}`, name, level, fansMedal, pendant, vip].filter((item) => item !== '').join('\n')
    ),
    Message.Plain('\n'),
    Message.Image(null, data.data.face),
  ];
};
