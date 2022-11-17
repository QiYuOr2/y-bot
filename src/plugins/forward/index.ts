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
        source: '',
        nodeList: [
          {
            senderId: this.context.memberList[Math.floor(Math.random() * this.context.memberList.length)].id,
            time: parseInt(String(new Date().getTime() / 1000)),
            senderName: '朋友',
            messageChain: [
              Message.Plain(message.replace(/他|她|它/g, '我'))
            ]
          }
        ]
      });
    });
  }
}
