import { Message } from 'mirai-ts';
import axios from 'axios';

export const hitokoto = async () => {
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
};
