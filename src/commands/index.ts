import { Message, MessageType, Mirai } from 'mirai-ts';
import { isPromise } from 'util/types';
import { rollFood } from './eat';
import { hitokoto } from './hitokoto';
import { atk } from './atk';
import { fate } from './roll';
import { anime } from './bangumi';
import { bili, weibo } from './hot';
import { toNihon } from './transfor';
import { info } from './search';
import { gen500 } from './gen';
import { readToBase64 } from '../common/utils';
import path from 'path';

type Action = (
  ...args: any
) => MessageType.MessageChain | Promise<MessageType.MessageChain>;

export class YCommand {
  commands: Record<string, Action>;
  constructor() {
    this.commands = {
      eat: rollFood,
      hello: hitokoto,
      help: this.help,
      atk,
      roll: this.roll,
      daily: anime,
      hot: this.hot,
      t: this.transfor,
      ['成分']: (options: any[]) => {
        const [, , uid] = options;
        return info(uid);
      },
      meme1: gen500,
    };
  }

  help() {
    const helpText = [
      '当前支持指令:',
      '/eat [roll一个饭/菜]',
      '/hello [一言]',
      '/atk @user [你攻击性好强]',
      '/roll 1 [抽个签]',
      '/roll 10 [抽十个签]',
      '/daily [今日更新的番剧]',
      '/hot bili [b站当前热搜]',
      '/hot weibo [微博当前热搜]',
      '/t 随便写点什么 [用平假名标记文字]',
      '/成分 B站UID [查b站信息]',
      // '/meme1 上面的文字 下面的文字 [梗图]',
    ];
    return [Message.Plain(helpText.join('\n'))];
  }

  whl(msg: string) {
    if (msg === '我好了') {
      return [Message.Plain('憋回去，不许好喵!')];
    }
    if (msg.includes('涩涩') || msg.includes('色色')) {
      return [Message.Plain('变态，禁止涩涩！')];
    }
  }

  kaibai(msg: string) {
    if (msg === '开摆') {
      return [
        Message.Image(
          null,
          null,
          null,
          readToBase64(path.join(__dirname, '../../assets/images/kaibai.jpg'))
        ),
      ];
    }
  }

  roll(options: any[]) {
    const [, , flag] = options;
    console.log(options);
    switch (Number(flag)) {
      case 1:
        return fate();
      case 10:
        return fate(10);
      default:
        return [Message.Plain('暂不支持该参数喵！')];
    }
  }

  hot(options: any[]) {
    const [, , flag] = options;
    switch (flag) {
      case 'bili':
        return bili();
      case 'weibo':
        return weibo();
      default:
        return [Message.Plain('暂不支持该参数喵！')];
    }
  }

  transfor(options: any[]) {
    const [, , msg] = options;
    return toNihon(msg);
  }

  async exec(name: string, options: any[]) {
    if (Object.keys(this.commands).includes(name)) {
      const action = this.commands[name];
      if (isPromise(action)) {
        return await action(options);
      }
      return action(options);
    }

    return [Message.Plain('暂不支持该指令喵！')];
  }
}
