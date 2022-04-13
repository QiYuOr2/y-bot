import axios from 'axios';
import { Message, MessageType } from 'mirai-ts';
import { load } from 'cheerio';

export const bili = async () => {
  const { data } = await axios.get('http://s.search.bilibili.com/main/hotword');
  const { list } = data;
  return [
    Message.Plain('bilibili当前热搜\n========\n'),
    ...list.map((item: any, i: number) =>
      Message.Plain(`${item.show_name}${i !== list.length - 1 ? '\n' : ''}`)
    ),
  ];
};

export const weibo: () => Promise<MessageType.MessageChain> = async () => {
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
        resolve([Message.Plain('微博当前热搜\n========\n'), Message.Plain(list.join('\n'))]);
      }
    });
  });
};
