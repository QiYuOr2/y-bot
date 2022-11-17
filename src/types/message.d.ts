import type { toMessageChain } from 'mirai-ts';

export interface Group {
  id: number;
  name: string;
  permission: 'MEMBER';
}

export interface Member {
  id: number;
  memberName: string;
  specialTitle: string;
  permission: 'MEMBER';
  joinTimestamp: string;
  lastSpeakTimestamp: string;
  muteTimeRemaining: string;
  group: Group;
}

export interface Friend {
  id: number;
  nickname: string;
  remark: string;
}

type MessageChain = ReturnType<typeof toMessageChain>;

/**
 * 接收到的消息
 */
export interface ReceiveMessage {
  type: 'FriendMessage' | 'GroupMessage';

  /**
   * 消息链
   */
  messageChain: MessageChain;
  /**
   * 发送者
   */
  sender: Member | Friend;

  /**
   * 消息的文字内容
   */
  plain: string;

  /**
   * 是否At Bot
   */
  isAtMe: boolean;
}

/**
 * 处理后的消息
 */
export interface BotMessage {
  type: 'FriendMessage' | 'GroupMessage';
  /**
   * 发送者QQ
   */
  senderQQ: number;

  /**
   * 是否At Bot
   */
  isAtMe: boolean;

  /**
   * 存在触发bot的关键词
   */
  hasKeywords: boolean;

  /**
   * 关键词 - 只保留第一个
   */
  keywords?: string;

  /**
   * 匹配的正则
   */
  keywordsRegExp?: RegExp

  /**
   * 触发词设置为正则时，存储匹配后的结果
   */
  matchKeywords?: RegExpMatchArray;

  /**
   * 部分关键词需要解析的参数
   */
  args?: string[];
}
