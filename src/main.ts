import fs from 'fs';
import path from 'path';
import { MiraiApiHttpSetting } from 'mirai-ts';
import yaml from 'js-yaml';
import setup from './core/setup';

const settings = yaml.load(
  fs.readFileSync(path.resolve(__dirname, '../../../app/mcl/config/net.mamoe.mirai-api-http/setting.yml'), 'utf8')
) as MiraiApiHttpSetting;

setup({
  qq: 2799397589,
  settings,
});
