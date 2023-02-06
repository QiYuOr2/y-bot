import { Message } from 'mirai-ts';
import puppeteer from 'puppeteer';
import Plugin from '../../core/plugin';

let cacheContent = '';

export class MonitorPlugin extends Plugin {
  constructor() {
    super();
    this.timer('0 */5 8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23 * * ?').action(() => this.arknightsInBili());
  }

  async arknightsInBili() {
    console.log('[y-bot] [timer] 执行');
    const isFirstLaunch = cacheContent === '';

    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      timeout: 50000
    });
    const page = await browser.newPage();

    await page.goto('https://space.bilibili.com/161775300/dynamic');

    await page.waitForSelector('#page-dynamic > div.col-1 > div > div.bili-dyn-list__items > div:nth-child(2) > div > div > div.bili-dyn-item__body > div.bili-dyn-content > div > div.bili-dyn-content__orig__desc > div > div.bili-rich-text__content', { timeout: 50000 });

    const targetContent = await page.evaluate(() => {
      // 注入页面的脚本，无法使用外部变量
      return document.querySelector('#page-dynamic > div.col-1 > div > div.bili-dyn-list__items > div:nth-child(2) > div > div > div.bili-dyn-item__body > div.bili-dyn-content > div > div.bili-dyn-content__orig__desc > div > div.bili-rich-text__content')?.textContent;
    });

    await browser.close();

    if (targetContent) {
      if (!isFirstLaunch && cacheContent !== targetContent) {
        this.context.mirai.api.sendGroupMessage([
          '[警告] 监测到世界线变动！\n=====================\n',
          '明日方舟发布了未知的bilibili动态，内容如下: \n\n',
          targetContent,
          '\n=====================\n',
          '详情请前往 https://space.bilibili.com/161775300/dynamic 查看'
        ].map(t => Message.Plain(t)), 708376391);
      }
      cacheContent = targetContent;
    }

    console.log(targetContent);
  }
}
