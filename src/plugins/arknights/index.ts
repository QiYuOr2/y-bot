import { Message } from 'mirai-ts';
import Plugin from '../../core/plugin';
import { counter, fillArray, Pool, readArknightsGacha } from '../../utils';

const PoolTypeR: Record<string, string> = {
  限定: 'limit',
};

const chance: [string, number][] = [
  ['ssr', 2],
  ['sr', 8],
  ['r', 50],
  ['n', 40]
];

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

    const probability = counter(chance, count);

    const n = Pool(currentGachaPool.all.n).get(probability.get('n'));
    const r = Pool(currentGachaPool.all.r).get(probability.get('r'));
    const sr = Pool(this.#fillPoolWithNormalUp(currentGachaPool.all.sr, currentGachaPool.up.sr))
      .get(probability.get('sr'));
    const ssr = Pool(this.#fillPoolWithLimitUp(currentGachaPool.all.ssr, currentGachaPool.up))
      .get(probability.get('ssr'));

    const wishResult = { ssr, sr, r };

    const messageResult = Object.keys(wishResult).reduce((result, k) => {
      const level = `${k}====\n`;
      const currentLevelResult = wishResult[k as keyof typeof wishResult];

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
      Message.Plain('====\n三星已省略\n暂无保底机制')
    ];
  }

  #fillPoolWithNormalUp(source: string[], up: string[]) {
    const upCount = Math.round(source.length / up.length);

    return [...source, ...up.map(item => fillArray(upCount, item)).flat()];
  }

  #fillPoolWithLimitUp(source: string[], up: GachaUp<string[]>) {
    const mainProbability = 0.7;
    const mainUpCount = Math.round((mainProbability * source.length) / (1 - mainProbability));

    const mainList = up.ssr.main.map(
      item => fillArray(Math.floor(mainUpCount / up.ssr.main.length), item)
    );
    const subList = up.ssr.sub.map(
      item => fillArray(5, item)
    );
    
    return [...source, ...mainList, ...subList].flat();
  }
}
