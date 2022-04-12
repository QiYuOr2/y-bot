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

async function app() {
  const c = new YCommand();
  await mirai.link(qq);
  mirai.on('message', async (msg) => {
    console.log(msg);
    if (msg.plain.slice(0, 1) === '$') {
      const [name, ...options] = msg.plain.split(' ');

      msg.reply(await c.exec(name.slice(1), [msg.sender.id, ...options]));
      return;
    }
    // 复读
    // msg.reply(msg.messageChain);
  });
  mirai.listen();
}

app();
