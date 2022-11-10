import Entry from './core/entry';

Entry.create()
  .receive({
    type: 'FriendMessage',
    plain: '.rd100 吃饭',
    isAtMe: false,
    messageChain: [],
    sender: {
      id: 123,
      nickname: 'string',
      remark: 'string',
    },
  })
  .toReplyMessage();

Entry.create()
  .receive({
    type: 'FriendMessage',
    plain: '.r 2d6',
    isAtMe: false,
    messageChain: [],
    sender: {
      id: 123,
      nickname: 'string',
      remark: 'string',
    },
  })
  .toReplyMessage();
