import fs from 'fs';
import path from 'path';
import { Mirai } from 'mirai-ts';
import type { MiraiApiHttpSetting } from 'mirai-ts';
import yaml from 'js-yaml';
import { YCommand } from './commands';

const qq = 2799397589;

const setting = yaml.load(
  fs.readFileSync(
    path.resolve(
      __dirname,
      '../../../app/mcl/config/net.mamoe.mirai-api-http/setting.yml'
    ),
    'utf8'
  )
) as MiraiApiHttpSetting;

const mirai = new Mirai(setting);

let autoReply = false;
async function app() {
  const c = new YCommand();
  await mirai.link(qq);
  mirai.on('message', async (msg) => {
    console.log(msg);

    if (msg.plain.slice(0, 1) === '/') {
      const [name, ...options] = msg.plain.split(' ');

      msg.reply(
        await c.exec(name.slice(1), [
          msg.sender.id,
          msg.messageChain,
          ...options,
        ])
      );
      return;
    }

    const whl = c.whl(msg.plain);
    if (whl) {
      msg.reply(whl);
      return;
    }

    const kaibai = c.kaibai(msg.plain);
    if (kaibai) {
      msg.reply(kaibai);
      return;
    }

    // if (msg.plain === '开启复读模式') {
    //   autoReply = true;
    // }

    // if (msg.plain === '关闭复读模式') {
    //   autoReply = false;
    // }

    // if (msg.plain.includes('老婆')) {
    //   msg.reply('是在叫我吗？', true);
    //   return;
    // }

    // 复读
    autoReply && msg.reply(msg.messageChain);
  });
  mirai.listen();
}

app();
