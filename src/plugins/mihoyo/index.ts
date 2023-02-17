import { AppWishResult, GenshinGachaKit } from 'genshin-gacha-kit';
import { Message } from 'mirai-ts';
import Plugin from '../../core-old/plugin';
import { define } from '@/core/define';
import { parsePlain } from '@/utils';
import { MessageChain } from '@/types/message';

const PoolTypeR = {
  新手: 100,
  常驻: 200,
  角色: 301,
  武器: 302
};

async function drawCard(pool: keyof typeof PoolTypeR, count = 10) {
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
  return Message.Plain(messageResult);
}

export const mihoyo = define('原神', async (ctx) => {
  const [count, pool] = parsePlain(ctx.message?.plain ?? '')._;
  return [ctx.atSender(), Message.Plain('\n'), await drawCard(pool as any, Number(count))] as MessageChain;
});
