import { Message } from 'mirai-ts';
import Plugin from '../../core/plugin';
import { MessageChain } from '../../types/message';
import { isUndefined } from '../../utils';

const fateList = [
  ['大吉', 10],
  ['凶', 5],
  ['末吉', 25],
  ['小吉', 25],
  ['吉', 25],
  ['中吉', 10]
];
export class RollPlugin extends Plugin {
  constructor() {
    super();

    this.set(['.roll', '/roll']).action(this.fate);
    this.set([/(\.rd)(\d*)/, '.r']).action((...args) => {
      return this.rd(...args);
    });
  }

  fate(income: string) {
    const count = Number(income) || 1;
    const countMap = new Map();

    const list = fateList.map((item) => new Array(item[1]).fill(item[0])).flat() as string[];
    const get = new Array(count).fill(0).map(() => {
      const current = list[Math.floor(Math.random() * list.length)];

      if (countMap.has(current)) {
        countMap.set(current, countMap.get(current) + 1);
      } else {
        countMap.set(current, 1);
      }

      return Message.Plain(current + ' ');
    });

    if (count > 30) {
      return [Message.Plain(Array.from(countMap).reduce((result, item) => {
        return `${result}${result === '' ? '' : ', '}${item[0]}: ${item[1]}次`;
      }, ''))];
    }

    return [
      ...get
      // Message.Plain('（大吉概率限时up中！）'),
    ];
  }

  rd(...args: any[]) {
    let result: MessageChain | undefined;
    const regMatchArgs = args.at(-1);
    if (Array.isArray(regMatchArgs)) {
      if (regMatchArgs[1] === '.rd') {
        const faces = Number(regMatchArgs[2] || 100);
        result = this.dice(1, faces);
      }
    } else {
      if (args[0]) {
        const [countStr, facesStr] = args[0].toLowerCase().split('d');
        result = this.dice(Number(countStr), Number(facesStr));
      } else {
        result = undefined;
      }
    }

    console.log(result);

    if (isUndefined(result)) {
      return undefined;
    }

    return this.message.type === 'FriendMessage' ? result : [Message.At(this.message.senderQQ), ...result];
  }

  dice(count: number, faces: number) {
    const results = new Array(count).fill(0).map(() => Math.floor(Math.random() * (faces - 1 + 1) + 1));
    return [Message.Plain(`${count}D${faces}=${results.reduce((total, current) => total + current, 0)}`)];
  }
}
