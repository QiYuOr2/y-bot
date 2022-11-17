import Entry from './core/entry';

(async () => {
  const result = await Entry.create()
    .receive({
      type: 'FriendMessage',
      plain: '朋友说 100',
      isAtMe: false,
      messageChain: [],
      sender: {
        id: 123,
        nickname: 'string',
        remark: 'string'
      }
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
