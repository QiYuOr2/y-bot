import { Mirai } from 'mirai-ts';
import Entry from './core/entry';

(async () => {
  const result = await Entry.create({} as Mirai)
    .receive({
      type: 'FriendMessage',
      plain: '.pa',
      isAtMe: false,
      messageChain: [
        { type: 'Source', id: 1176281967, time: Date.now() },
        { type: 'At', target: 1176281967, display: '@1' }
      ],
      sender: {
        id: 123,
        nickname: 'string',
        remark: 'string'
      }
    })
    .toReplyMessage();

  console.log(result);
})();
