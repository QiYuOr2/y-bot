import { Message, MessageType, Mirai } from 'mirai-ts';

export default class BotContext {
  mirai: Mirai;
  message?: MessageType.ChatMessage;

  constructor(mirai: Mirai) {
    this.mirai = mirai;
  }

  /**
   * `@消息发送者`, 仅能在 `on('message')` 环境下使用
   */
  atSender() {
    if (this.isGroupMessage() && this.message?.sender.id) {
      return Message.At(this.message?.sender.id);
    }
  }

  reply(msgChain: string | MessageType.MessageChain, quote?: boolean | undefined) {
    return this.message?.reply(msgChain, quote);
  }

  isFriendMessage() {
    return this.message?.type === 'FriendMessage';
  }

  isGroupMessage() {
    return this.message?.type === 'GroupMessage';
  }

  sendFriend(msgChain: string | MessageType.MessageChain, target: number, quote?: number | undefined) {
    return this.mirai.api.sendFriendMessage(msgChain, target, quote);
  }

  sendGroup(msgChain: string | MessageType.MessageChain, target: number, quote?: number | undefined) {
    return this.mirai.api.sendGroupMessage(msgChain, target, quote);
  }
}
