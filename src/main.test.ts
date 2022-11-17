import Entry from './core/entry';

(async () => {
  const result = await Entry.create()
    .receive({
      type: 'FriendMessage',
      plain: '明日方舟 100 常驻',
      isAtMe: false,
      messageChain: [],
      sender: {
        id: 123,
        nickname: 'string',
        remark: 'string',
      },
    })
    .toReplyMessage();
      
  console.log(result);
})();

// Entry.create()
//   .receive({
//     type: 'FriendMessage',
//     plain: '.r 2d6',
//     isAtMe: false,
//     messageChain: [],
//     sender: {
//       id: 123,
//       nickname: 'string',
//       remark: 'string',
//     },
//   })
//   .toReplyMessage();
