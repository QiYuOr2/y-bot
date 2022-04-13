import Kuroshiro from 'kuroshiro';
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji';
import { Message } from 'mirai-ts';

export const toNihon = async (msg: string) => {
  const kuroshiro = new Kuroshiro();
  await kuroshiro.init(new KuromojiAnalyzer());

  const result = await kuroshiro.convert(msg, { mode: 'okurigana', to: 'hiragana' });
  return [Message.Plain(result)];
};
