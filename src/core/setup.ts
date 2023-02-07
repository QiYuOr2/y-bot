import Mirai, { MessageType, MiraiApiHttpSetting } from 'mirai-ts';
import { ReceiveMessage } from '../types/message';
import { isUndefined, readSensitiveWords } from '../utils';
import Entry from './entry';

type SetupOptions = {
  qq: number;
  settings: MiraiApiHttpSetting;
  // eslint-disable-next-line no-unused-vars
  handler?: (msg: any) => void;
};

export default async function setup(options: SetupOptions) {
  const mirai = new Mirai(options.settings);
  await mirai.link(options.qq);

  const { data: memberList } = await mirai.api.memberList(708376391);

  Entry.create(mirai);

  mirai.on('message', async (message) => {
    console.log(message);

    const isAtMe = (message as MessageType.GroupMessage)?.isAt?.() ?? false;

    const result = await Entry.create(mirai)
      .use((ctx) => { ctx.memberList = memberList; })
      .receive({ ...(message as Omit<ReceiveMessage, 'isAtMe' | 'atTarget'>), isAtMe })
      .toReplyMessage();

    !isUndefined(result) && message.reply(result);

    readSensitiveWords().some((w) => message.plain.includes(w)) &&
      message.reply('检测到敏感词汇！请注意发言用词！', true);
  });

  mirai.listen();
}
