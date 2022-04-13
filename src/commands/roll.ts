import { Message } from 'mirai-ts';

const fateList = [
  ['大吉', 10],
  ['凶', 5],
  ['末吉', 25],
  ['小吉', 25],
  ['吉', 25],
  ['中吉', 10],
];

export const fate = (count = 1) => {
  const list = fateList.map((item) => new Array(item[1]).fill(item[0])).flat() as string[];
  const get = new Array(count)
    .fill(0)
    .map(() => Message.Plain(list[Math.floor(Math.random() * list.length)] + ' '));
  return [
    ...get,
    // Message.Plain('（大吉概率限时up中！）'),
  ];
};
