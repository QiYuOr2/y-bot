import { Message } from 'mirai-ts';
import puppeteer from 'puppeteer';

function genUrl(top: string, bottom: string) {
  const minWidth = 340;
  const length =
    120 * (top.length > bottom.length ? top.length : bottom.length);
  return `http://yurafuca.com/5000choyen/result_cn.html?top=${encodeURIComponent(
    top
  )}&bottom=${encodeURIComponent(
    bottom
  )}&bx=250&order=false&color=false&width=${
    length > minWidth ? length : minWidth
  }&height=290`;
}

export const gen500 = async (options: any[]) => {
  try {
    const [, , top, bottom] = options;
    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      timeout: 50000,
    });
    const page = await browser.newPage();

    const url = genUrl(top, bottom);
    console.log(url);

    await page.goto(url);

    await page.waitForSelector('img[src]', { timeout: 50000 });

    const base64 = await page.evaluate(() => {
      return document.querySelector('img')?.getAttribute('src') || '';
    });

    await browser.close();

    console.log(base64);

    if (base64) {
      return [
        Message.Image(
          null,
          null,
          null,
          base64.replace(/\s/g, '').replace('data:image/png;base64,', '')
        ),
      ];
    }
    return [Message.Plain('对不起！生成失败了！')];
  } catch (error) {
    return [Message.Plain('对不起！服务超时了！')];
  }
};
