import fs from 'fs';
import path from 'path';
import { MiraiApiHttpSetting } from 'mirai-ts';
import yaml from 'js-yaml';
import { createApp } from './core2/application';

const settings = yaml.load(
  fs.readFileSync(path.resolve(__dirname, '../../../app/mcl/config/net.mamoe.mirai-api-http/setting.yml'), 'utf8')
) as MiraiApiHttpSetting;

createApp({ qq: 2799397589, settings })
  .use((ctx) => {
  })
  .listen();
