import { readFileSync } from 'fs';
import { join } from 'path';
import { GenshinKit } from '@genshin-kit/core';
import { Message } from 'mirai-ts';
import Plugin from '../../core/plugin';
import { render, template } from './utils/template';

const mihoyo = new GenshinKit();

mihoyo.loginWithCookie(readFileSync(join(__dirname, '../../../config/cookie'), 'utf-8'));

export class MihoyoPlugin extends Plugin {
  constructor() {
    super();

    this.set('.mihoyo').action(async (uid: string) => {
      try {
        const id = Number(uid);
        const userInfo = await mihoyo.getUserInfo(id);

        await render(template('profile', { ...userInfo, uid }));
        
        console.log(userInfo);
      } catch (error) {
        console.log(error);
      }

      return undefined;
    });
  }

}
