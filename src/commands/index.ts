import { Message, MessageType } from 'mirai-ts';
import { rollFood } from './eat';

export class YCommand {
  commands: Record<string, (...args: any) => MessageType.MessageChain>;
  constructor() {
    this.commands = {
      eat: rollFood,
    };
  }

  exec(name: string, options: any) {
    if (Object.keys(this.commands).includes(name)) {
      return this.commands[name](options);
    }
    return [Message.Plain('暂不支持该指令喵！')];
  }
}
