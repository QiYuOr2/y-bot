import { MessageType } from 'mirai-ts';
import { BotMessage, ReceiveMessage } from '../types/message';
import { isRegExpString } from '../utils';

export default function receiveHandler(message: ReceiveMessage, keywords: string[]): BotMessage {
  const text = message.plain.split(' ');
  let keyword;
  let args;
  let matchKeywords;
  let keywordsRegExp;

  const hasKeywords = keywords.some((k) => {
    if (isRegExpString(k)) {
      const reg = new RegExp(k.slice(1, k.length - 1));
      let matchRegKeywordsResult = false;
      text.forEach((item, i) => {
        const matchResult = item.match(reg);
        if (matchResult) {
          matchKeywords = matchResult;
          args = text.slice(i + 1);
          keyword = item;
          keywordsRegExp = k;

          matchRegKeywordsResult = true;
        }
      });
      return matchRegKeywordsResult;
    }

    if (text.includes(k)) {
      keyword = k;

      // 从关键词后开始提取参数
      const keywordIndex = text.indexOf(k);
      args = text.slice(keywordIndex + 1);

      return true;
    }
    return false;
  });

  return {
    type: message.type,
    senderQQ: message.sender.id,
    isAtMe: message.isAtMe,
    hasKeywords,
    keywords: keyword,
    matchKeywords,
    keywordsRegExp,
    args,
    source: message.messageChain.at(0) as MessageType.Source,
    plain: message.plain,
    atTarget: (message.messageChain.filter(m => m.type === 'At')?.[0] as MessageType.At)?.target
  };
}
