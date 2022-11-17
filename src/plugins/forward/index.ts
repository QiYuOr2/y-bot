import { Message, toMessageChain } from 'mirai-ts';
import Plugin from '../../core/plugin';

export class ForwardPlugin extends Plugin {
  constructor() {
    super();

    this.set(['/朋友说/']).action((message: string) => {
      return toMessageChain({
        type: 'Forward',
        title: '朋友的聊天记录',
        brief: '聊天记录',
        summary: '查看 1 条转发消息',
        source: this.message.source.id.toString(),
        nodeList: [
          {
            senderId: 1176281967,
            time: parseInt(String(new Date().getTime() / 1000)),
            senderName: '朋友',
            messageChain: [
              Message.Plain(message)
            ]
          }
        ]
      });
    });
  }
}
