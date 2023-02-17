import { AppWishResult, GenshinGachaKit } from 'genshin-gacha-kit';
import { Message } from 'mirai-ts';
import Plugin from '../../core-old/plugin';

const PoolTypeR = {
  新手: 100,
  常驻: 200,
  角色: 301,
  武器: 302
};

export class MihoyoPlugin extends Plugin {
  constructor() {
    super();

    this.set(['.mi', '原神十连']).action(this.drawCard);
    this.set('原神').action(this.drawCardWithCount.bind(this));
  }

  async drawCardWithCount(count: string, pool: keyof typeof PoolTypeR) {
    return this.drawCard(pool, Number(count));
  }

  async drawCard(pool: keyof typeof PoolTypeR, count = 10) {
    const poolType = PoolTypeR[pool || '角色'] || 301;

    const mihoyo = new GenshinGachaKit(undefined as any);
    await mihoyo.setOfficialGachaPool(poolType as any);

    mihoyo.multiWish(count);

    const wishResult = mihoyo.getResult() as AppWishResult;

    const messageResult = Object.keys(wishResult).reduce((result, k) => {
      const level = `${k}====\n`;
      const currentLevelResult = wishResult[k as keyof AppWishResult];
      const counts = currentLevelResult
        .reduce((countResult, item) => `${countResult}${item.name}: ${item.count}个\n`, '');

      return currentLevelResult.length < 1 ? result : `${result}${level}${counts}`;
    }, '');

    return [
      this.atReceive(),
      Message.Plain('\n'),
      Message.Plain(messageResult)
    ];
  }
}
