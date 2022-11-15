import { Message } from 'mirai-ts';
import Plugin from '../../core/plugin';
import { omit, readArknightsGacha } from '../../utils';
import { ArknightsGacha, ArknightsGachaResult } from './gacha';

const PoolTypeR: Record<string, string> = {
  限定: 'limit',
  常驻: 'normal'
};

export class ArknightsPlugin extends Plugin {
  constructor() {
    super();

    this.set('明日方舟').action(this.drawCardWithCount.bind(this));
  }

  drawCardWithCount(count: string, pool: keyof typeof PoolTypeR) {
    return this.drawCard(pool, Number(count));
  }

  drawCard(pool: string, count = 10) {

    const _pool = PoolTypeR[Object.keys(PoolTypeR).includes(pool) ? pool : '限定'];
    const gacha = readArknightsGacha();

    const currentGachaPool = gacha[_pool as keyof typeof gacha];

    const arknights = new ArknightsGacha(currentGachaPool);

    let wishResult: Partial<ArknightsGachaResult>;

    wishResult = count > 1 ? omit(arknights.multi(count), 'n') : arknights.multi(count);
    const rCount = Object.keys(wishResult.r ?? {}).length > 10;
    wishResult = rCount ? omit(wishResult, 'r') : wishResult;

    const messageResult = Object.keys(wishResult).reduce((result, k) => {
      const level = `${k}====\n`;
      const currentLevelResult = wishResult[k as keyof typeof wishResult]!;

      if (Object.keys(currentLevelResult).length < 1) {
        return result;
      }

      const counts = Object.keys(currentLevelResult)
        .reduce((countResult, item) => `${countResult}${item}: ${currentLevelResult[item]}个\n`, '');
   
      return currentLevelResult.length < 1 ? result : `${result}${level}${counts}`;
    }, '');

    return [
      this.atReceive(),
      Message.Plain('\n'),
      Message.Plain(messageResult),
      Message.Plain(`====\n三星${rCount ? '与四星': ''}已省略`)
    ];
  }

}
