import { Message } from 'mirai-ts';
import Plugin from '../../core/plugin';
import { Counter, readArknightsGacha } from '../../utils';

const PoolTypeR: Record<string, string> = {
  限定: 'limit',
};

const chance = [
  ['ssr', 2],
  ['sr', 8],
  ['r', 50],
  ['n', 40]
];

export class ArknightsPlugin extends Plugin {
  constructor() {
    super();

    this.set('明日方舟').action(this.drawCard);
  }

  drawCard(pool: string, count = 10) {
    const _pool = Object.keys(PoolTypeR).includes(pool) ? pool : '限定';
    const gacha = readArknightsGacha();

    const currentGachaPool = gacha[_pool as keyof typeof gacha];

    const probability = Counter(chance, 10);

    return undefined;
  }
}
