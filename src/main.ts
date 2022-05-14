import fs from 'fs';
import path from 'path';
import { Mirai, MiraiApiHttpSetting } from 'mirai-ts';
import yaml from 'js-yaml';
import { createApp } from './core/create-app';

const settings = yaml.load(
  fs.readFileSync(
    path.resolve(
      __dirname,
      '../../../app/mcl/config/net.mamoe.mirai-api-http/setting.yml'
    ),
    'utf8'
  )
) as MiraiApiHttpSetting;

createApp({
  qq: 2799397589,
  settings,
});

// async function app() {
//   const c = new YCommand();
//   await mirai.link(qq);
//   mirai.on('message', async (msg) => {
//     console.log(msg);

//     if (msg.plain.slice(0, 1) === '/') {
//       const [name, ...options] = msg.plain.split(' ');

//       msg.reply(
//         await c.exec(name.slice(1), [
//           msg.sender.id,
//           msg.messageChain,
//           ...options,
//         ])
//       );
//       return;
//     }

//     const bvSearch = await c.searchBiliVideo(msg.plain);
//     if (bvSearch) {
//       msg.reply(bvSearch);
//       return;
//     }

//     const autoReplyMessage = c.autoReply(msg.plain);
//     if (autoReplyMessage) {
//       msg.reply(autoReplyMessage);
//       return;
//     }
//   });
//   mirai.listen();
// }

// app();
