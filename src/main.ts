import fs from 'fs';
import path from 'path';
import { MiraiApiHttpSetting } from 'mirai-ts';
import yaml from 'js-yaml';
import { createApp } from '@/core/application';
import { autoReply, eat, memes, mihoyo, monitor, tarot, wordCloudCache, wordCloudTest, wordCloudTimer } from '@/plugins';

const settings = yaml.load(
  fs.readFileSync(
    path.resolve(__dirname, '../../../app/mcl/config/net.mamoe.mirai-api-http/setting.yml'),
    'utf8'
  )
) as MiraiApiHttpSetting;

createApp({ qq: 2799397589, settings })
  .subscribe([monitor, wordCloudTimer])
  .subscribe([eat, tarot, mihoyo, wordCloudCache, wordCloudTest, ...autoReply, ...memes], 'message')
  .listen();
