import Entry from './core/entry';

for (let i = 0; i < 10; i++) {
  (async () => {
    const result = await Entry.create()
      .receive({
        type: 'FriendMessage',
        plain: '明日方舟 10 限定',
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
}

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
