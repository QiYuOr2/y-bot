import { Message } from "mirai-ts";
import { Service } from "../core/decorators";

const fateList = [
  ["大吉", 10],
  ["凶", 5],
  ["末吉", 25],
  ["小吉", 25],
  ["吉", 25],
  ["中吉", 10],
];

@Service()
export class RollService {
  async fate(count = 1) {
    const list = fateList.map((item) => new Array(item[1]).fill(item[0])).flat() as string[];
    const get = new Array(count).fill(0).map(() => Message.Plain(list[Math.floor(Math.random() * list.length)] + " "));
    return [
      ...get,
      // Message.Plain('（大吉概率限时up中！）'),
    ];
  }

  async dice(count: number, faces: number) {
    const results = new Array(count).fill(0).map(() => Math.floor(Math.random() * (faces - 1 + 1) + 1));
    return [Message.Plain(`${count}D${faces}=${results.reduce((total, current) => total + current, 0)}`)];
  }

  error() {
    return [Message.Plain("指令有错误，不要乱搞哦x_x")];
  }

  at(id: number) {
    return [Message.At(id), Message.Plain('\n')];
  }
}
