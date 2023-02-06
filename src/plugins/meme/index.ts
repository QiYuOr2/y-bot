import { Message } from 'mirai-ts';
import Plugin from '../../core/plugin';
import dear from './actions/dear';

export class MemePlugin extends Plugin {
  constructor() {
    super();

    this.set(['.dear', '亲亲']).action(async (target) => {
      const meme = await dear(() => target || this.message.atTarget);

      if (meme) {
        return [this.message.type === 'GroupMessage' ? this.atReceive() : Message.Plain(''), meme];
      }
    });
  }
}
