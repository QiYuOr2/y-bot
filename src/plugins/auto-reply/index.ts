import { Message } from 'mirai-ts';
import { ReplyConfigReturnOptions } from '@/types/config';
import { readReplyConfig, localImage, wrapArray } from '@/utils';
import { define } from '@/core/define';

function reply(returnOptions: ReplyConfigReturnOptions) {
  const result = [];
  returnOptions.image && result.push(localImage(returnOptions.image));
  returnOptions.text && result.push(Message.Plain(returnOptions.text));
  return result.length ? result : undefined;
}

export const autoReply = readReplyConfig()
  .list
  .map((item) =>
    wrapArray(item.receive.text)
      .map(keyword =>
        define(item.receive.is_contains ? new RegExp(keyword) : keyword, () => reply(item.return))
      )
  ).flat();
