import { Message } from 'mirai-ts';

export const rollFood = (foodList: string[]) => {
  return (options: any[]) => [
    Message.At(options[0]),
    Message.Plain(
      `今天吃【${foodList[Math.floor(Math.random() * foodList.length)]}】吧！`
    ),
  ];
};
