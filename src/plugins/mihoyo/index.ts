import { readFileSync } from 'fs';
import { join } from 'path';
import { GenshinKit } from '@genshin-kit/core';
import { Message } from 'mirai-ts';
import Plugin from '../../core/plugin';
import { localImage } from '../../utils';
import { render, template } from './utils/template';

const mihoyo = new GenshinKit();

mihoyo.loginWithCookie(readFileSync(join(__dirname, '../../../config/cookie'), 'utf-8'));

const StatsKeyMap: Record<any, string> = {
  active_day_number: '活跃天数',
  achievement_number: '完成成就',
  avatar_number: '角色数',
  way_point_number: '传送点',
  chest_number: '箱子数',
};

export class MihoyoPlugin extends Plugin {
  constructor() {
    super();

    this.set('.mihoyo').action(async (uid: string) => {
      try {
        const id = Number(uid);
        const userInfo = await mihoyo.getUserInfo(id);

        const stats = (Object.keys(userInfo.stats) as (keyof typeof userInfo.stats)[]).map((k) => {
          return {
            label: StatsKeyMap[k] || '',
            value: userInfo.stats[k]
          };
        });

        stats.push({
          label: StatsKeyMap['chest_number'],
          value: 
            userInfo.stats.precious_chest_number
            + userInfo.stats.luxurious_chest_number
            + userInfo.stats.exquisite_chest_number
            + userInfo.stats.common_chest_number
        });

        const imgTime = await render(template('profile', { ...userInfo, stats, uid }));
        
        return [localImage(`${imgTime}.png`, 'mihoyo')];
      } catch (error) {
        console.log(error);
      }

      return undefined;
    });
  }

}
