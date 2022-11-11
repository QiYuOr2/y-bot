import { GenshinKit } from '@genshin-kit/core'
import { readFileSync } from 'fs';
import { Message } from 'mirai-ts';
import { join } from 'path';
import Plugin from '../../core/plugin';

const mihoyo = new GenshinKit()

mihoyo.loginWithCookie(readFileSync(join(__dirname, '../../../config/cookie'), 'utf-8'))

export class MihoyoPlugin extends Plugin {
  constructor() {
    super();

    this.set('.mihoyo').action(async (uid: string) => {
      try {
        const result = await mihoyo.getAllCharacters(Number(101473326))
        console.log(result)
      } catch (error) {
        console.log(error)
      }

      return undefined
    })
  }

}
