import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { MiraiApiHttpSetting } from 'mirai-ts';
import { define } from './core2/plugin';
import { createApp } from './core2/application';

const settings = yaml.load(
  fs.readFileSync(path.resolve(__dirname, '../../../app/mcl/config/net.mamoe.mirai-api-http/setting.yml'), 'utf8')
) as MiraiApiHttpSetting;

const test = define('.echo', (ctx) => {
  ctx.reply(ctx.message?.plain ?? '');
});

createApp({ qq: 2799397589, settings })
  .subscribe([])
  .subscribe([test], 'message')
  .listen();

// import { Mirai } from 'mirai-ts';
// import Entry from './core/entry';
//
// (async () => {
//   const result = await Entry.create({} as Mirai)
//     .receive({
//       type: 'FriendMessage',
//       plain: '.pa',
//       isAtMe: false,
//       messageChain: [
//         { type: 'Source', id: 1176281967, time: Date.now() },
//         { type: 'At', target: 1176281967, display: '@1' }
//       ],
//       sender: {
//         id: 123,
//         nickname: 'string',
//         remark: 'string'
//       }
//     })
//     .toReplyMessage();
//
//   console.log(result);
// })();
