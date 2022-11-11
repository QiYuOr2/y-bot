import { AppWishResult, GenshinGachaKit } from 'genshin-gacha-kit';
import { Message } from 'mirai-ts';
import Plugin from '../../core/plugin';

const mihoyo = new GenshinGachaKit(undefined as any);

// const StatsKeyMap: Record<any, string> = {
//   active_day_number: '活跃天数',
//   achievement_number: '完成成就',
//   avatar_number: '角色数',
//   way_point_number: '传送点',
//   chest_number: '箱子数',
// };

// const PoolType = {
//   100: '新手',
//   200: '常驻',
//   301: '角色',
//   302: '武器',
// };

const PoolTypeR = {
  新手: 100,
  常驻: 200,
  角色: 301,
  武器: 302,
};

export class MihoyoPlugin extends Plugin {
  constructor() {
    super();

    // this.set('.mihoyo').action(this.profile);
    this.set('.mi').action(async (pool: keyof typeof PoolTypeR) => {
      const poolType = PoolTypeR[pool || '角色'] || 301;

      await mihoyo.setOfficialGachaPool(poolType as any);

      mihoyo.multiWish(10);

      const result: AppWishResult = mihoyo.getResult();

      Object.keys(result).reduce((result, k) => {
        return result + `${k}====\n${result[k]}`
      }, '');

      return undefined;
    });
  }

  // async profile(uid: string) {
  //   try {
  //     const id = Number(uid);

  //     if (!util.isValidUid(id)) {
  //       return [Message.Plain('uid错误')];
  //     }

  //     const userInfo = await mihoyo.getUserInfo(id);

  //     console.log('userInfo', userInfo);

  //     const stats = (Object.keys(userInfo.stats) as (keyof typeof userInfo.stats)[]).map((k) => {
  //       return {
  //         label: StatsKeyMap[k] || '',
  //         value: userInfo.stats[k]
  //       };
  //     });

  //     stats.push({
  //       label: StatsKeyMap['chest_number'],
  //       value: 
  //         userInfo.stats.precious_chest_number
  //         + userInfo.stats.luxurious_chest_number
  //         + userInfo.stats.exquisite_chest_number
  //         + userInfo.stats.common_chest_number
  //     });

  //     const imgTime = await render(template('profile', { ...userInfo, stats, uid }));
      
  //     return [localImage(`${imgTime}.png`, 'mihoyo')];
  //   } catch (error: any) {
  //     console.log('error', error);
  //     if (error) {
  //       return [Message.Plain(error.message || '米游社无情的拒绝了访问，并且没有说为什么')];
  //     }
  //   }

  //   return undefined;
  // }
}
