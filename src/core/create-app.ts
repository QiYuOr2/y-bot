import Mirai from 'mirai-ts';
import { Bili, Hot, Roll } from '../commands';
import { CommandCenter } from './command-center';
import { useCommand } from './use-command';

type CreateAppOptions = {
  qq: number;
  settings: any;
  handler?: (msg: any) => void;
};

export async function createApp(options: CreateAppOptions) {
  const mirai = new Mirai(options.settings);
  await mirai.link(options.qq);

  useCommand([Bili, Hot, Roll]);

  mirai.on('message', async (message) => {
    console.log(message);

    if (message.plain.slice(0, 1) === '/') {
      const [name, optionKey, ...args] = message.plain.split(' ');
      const hasOptionKey = /^[0-9a-zA-Z]*$/g.test(optionKey);
      const handlerKey = hasOptionKey
        ? `${name.slice(1)}_${optionKey}`
        : name.slice(1);

      const handler = CommandCenter.getInstance().handlers.get(handlerKey);
      if (!handler) {
        message.reply('没有找到这个指令喵');
        return;
      }

      const result = await CommandCenter.getInstance<CommandCenter>().exec(
        handler!.name,
        hasOptionKey ? optionKey : name,
        ...(hasOptionKey ? args : [optionKey, ...args])
      );
      message.reply(result);
    }
  });
  mirai.listen();
}
