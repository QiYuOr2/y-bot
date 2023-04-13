import fs from 'fs';
import jieba from 'nodejieba';
import { createCanvas } from 'canvas';
import { Message } from 'mirai-ts';
import { define, defineTimer } from '@/core/define';
import { assets, localImage } from '@/utils';

const WordCloud = require('node-wordcloud')();

jieba.load({
  stopWordDict: assets('db/stopword.txt')
});

const TmpFilename = '480557906';
const TmpPath = assets(`db/${TmpFilename}`);

const saveDB = (cache: string[]) => {
  const raw = JSON.parse(fs.readFileSync(TmpPath, 'utf-8') || '{}');

  const data = Object.fromEntries(
    cache.map(item => jieba.cut(item).filter(c => c.length > 1).map(c => c.toUpperCase())).flat().reduce((result, current) => {
      result.set(current, (result.get(current) ?? 0) + 1);

      return result;
    }, new Map<string, number>(Object.entries(raw)))
  );

  fs.writeFileSync(TmpPath, JSON.stringify(data), 'utf-8');
};

let cache: string[] = [];
/**
 * 分词存储
 */
export const wordCloudCache = define([/[\s\S]/], (ctx) => {
  if (!ctx.message?.plain && (!ctx.message?.group(480557906) && !ctx.message?.group(646247690))) {
    return;
  }
  ctx.message?.plain && cache.push(ctx.message.plain);
  console.log('数据进入缓存', cache);

  if (cache.length > 10) {
    saveDB(cache.slice());
    cache = [];
  }
});

const generateWordCloud = () => {
  const list: [string, number][] = Object.entries(JSON.parse(fs.readFileSync(TmpPath, 'utf-8') || '{}'));
  if (list.length < 1) {
    return;
  }

  const canvas = createCanvas(500, 500);

  const wc = WordCloud(canvas, { list: list.filter((item) => item[1] > 5) });

  wc.draw();

  const filePath = TmpPath.replace('db', 'images') + '.png';

  fs.writeFileSync(TmpPath, '{}', 'utf-8');
  fs.writeFileSync(filePath, canvas.toBuffer('image/png'));

  return filePath;
};

export const wordCloudTest = define('.wordtest', () => {
  const filePath = generateWordCloud();
  if (filePath) {
    return [Message.Plain('今日词云'), localImage('480557906.png')];
  }
});

export const wordCloudTimer = defineTimer('0 0 23 * * ?', (ctx) => {
  const filePath = generateWordCloud();
  if (filePath) {
    ctx.sendGroup([Message.Plain('今日词云'), localImage('480557906.png')], 480557906);
  }
});
