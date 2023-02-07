import { Message, MessageType } from 'mirai-ts';
import Plugin from '../../core/plugin';
import coupon from './actions/coupon';
import dear from './actions/dear';
import marry from './actions/marry';
import pet from './actions/pet';

export class MemePlugin extends Plugin {
  constructor() {
    super();

    this.set(['.dear', '亲亲']).action(async (target) => {
      const meme = await dear(() => target || this.message.atTarget);

      return this.replyMeme(meme);
    });

    this.set(['.pet', '摸摸']).action(async (target) => {
      const meme = await pet(() => target || this.message.atTarget);

      return this.replyMeme(meme);
    });

    this.set(['.marry', '和我结婚']).action(async (target) => {
      const meme = await marry(() => target || this.message.atTarget);

      return this.replyMeme(meme);
    });

    this.set(['.coupon', '陪睡']).action(async (target) => {
      const meme = await coupon(() => target || this.message.atTarget);

      return this.replyMeme(meme);
    });
  }

  replyMeme(meme?: MessageType.Image) {
    if (meme) {
      return [this.message.type === 'GroupMessage' ? this.atReceive() : Message.Plain(''), meme];
    }
  }
}
