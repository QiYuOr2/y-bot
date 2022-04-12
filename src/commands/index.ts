import { Message, MessageType } from 'mirai-ts';
import { isPromise } from 'util/types';
import { rollFood } from './eat';
import { hitokoto } from './hitokoto';

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
    };
  }

  help() {
    const helpText = ['当前支持指令:', '$eat [roll一个饭/菜]', '$hello [一言]'];
    return [Message.Plain(helpText.join('\n'))];
  }

  async exec(name: string, options: any) {
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
