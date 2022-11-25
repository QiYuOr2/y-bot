import { Message, toMessageChain } from 'mirai-ts';
import Plugin from '../../core/plugin';

export class ForwardPlugin extends Plugin {
  constructor() {
    super();

    this.set([/朋友说/, /群友说/]).action((message: string) => {
      const splitMessage = this.message.plain.split(/朋友说|群友说/)?.[1] ?? '';

      const isGroupMember = this.message.plain.includes('群友');

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
            senderName: isGroupMember ? '群友' : '朋友',
            messageChain: [
              Message.Plain((splitMessage || message).replace(/他|她|它/g, '我'))
            ]
          }
        ]
      });
    });
  }
}
