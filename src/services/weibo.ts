import axios from 'axios';
import { load } from 'cheerio';
import { Message } from 'mirai-ts';
import { Service } from '../decorators';

@Service()
export class WeiboService {
  async hot() {
    const { data } = await axios('https://tophub.today/');
    let $ = load(data);
    const weiboHtml = $('.cc-cd-cb').first().html();
    $ = load(weiboHtml as any);

    return new Promise((resolve) => {
      const list: any[] = [];
      $('.cc-cd-cb-ll').each(function () {
        const inner = load($(this).html() as any);
        list.push(
          [
            inner('.s').text(),
            `[${inner('.t').text().replace('肖战', '🦐')}]`,
            inner('.e').text(),
          ].join(' ')
        );

        if (list.length === 50) {
          resolve([
            Message.Plain('微博当前热搜\n========\n'),
            Message.Plain(list.join('\n')),
          ]);
        }
      });
    });
  }
}
