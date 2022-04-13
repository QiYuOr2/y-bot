import { Message, MessageType } from 'mirai-ts';
import { isPromise } from 'util/types';
import { rollFood } from './eat';
import { hitokoto } from './hitokoto';
import { atk } from './atk';
import { fate } from './roll';

type Action = (...args: any) => MessageType.MessageChain | Promise<MessageType.MessageChain>;

export class YCommand {
  commands: Record<string, Action>;
  constructor() {
    this.commands = {
      eat: rollFood,
      hello: hitokoto,
      help: this.help,
      atk,
      roll: this.roll,
    };
  }

  help() {
    const helpText = [
      '当前支持指令:',
      '$eat [roll一个饭/菜]',
      '$hello [一言]',
      '$atk [你攻击性好强]',
      '$roll 1 [抽个签]',
      '$roll 10 [抽十个签]',
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
