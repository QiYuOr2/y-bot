import Plugin from '../../core/plugin';
import dear from './actions/dear';

export class MemePlugin extends Plugin {
  constructor() {
    super();

    this.set(['.dear', '.亲亲']).action(async () => {
      const meme = await dear(() => this.message.atTarget);

      if (meme) {
        return [this.atReceive(), meme];
      }
    });
  }
}
