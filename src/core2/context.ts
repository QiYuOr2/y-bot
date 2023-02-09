import { MessageType, Mirai } from 'mirai-ts';

export default class BotContext {
  mirai: Mirai;
  message!: MessageType.ChatMessage;

  constructor(mirai: Mirai) {
    this.mirai = mirai;
  }

  reply(msgChain: string | MessageType.MessageChain, quote?: boolean | undefined) {
    return this.message.reply(msgChain, quote);
  }

  sendFriend(msgChain: string | MessageType.MessageChain, target: number, quote?: number | undefined) {
    this.mirai.api.sendFriendMessage(msgChain, target, quote);
  }

  sendGroup(msgChain: string | MessageType.MessageChain, target: number, quote?: number | undefined) {
    this.mirai.api.sendGroupMessage(msgChain, target, quote);
  }
}
