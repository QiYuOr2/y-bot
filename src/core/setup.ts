import Mirai, { MessageType, MiraiApiHttpSetting } from 'mirai-ts';
import { ReceiveMessage } from '../types/message';
import { isUndefined } from '../utils';
import Entry from './entry';

type SetupOptions = {
  qq: number;
  settings: MiraiApiHttpSetting;
  handler?: (msg: any) => void;
};

export default async function setup(options: SetupOptions) {
  const mirai = new Mirai(options.settings);
  await mirai.link(options.qq);

  mirai.on('message', async (message) => {
    console.log(message);

    const isAtMe = (message as MessageType.GroupMessage)?.isAt?.() ?? false;

    const result = Entry.create()
      .receive({ ...(message as Omit<ReceiveMessage, 'isAtMe'>), isAtMe })
      .toReplyMessage();

    !isUndefined(result) && message.reply(result);
  });

  mirai.listen();
}
