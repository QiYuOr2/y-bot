import fs from 'fs';
import path from 'path';
import y from 'js-yaml';
import glob from 'glob';
import { Message } from 'mirai-ts';
import { GachaConfig } from '../types/config';

export const assets = (pathname: string) => path.join(__dirname, `../../assets/${pathname}`);

export const readToBase64 = (pathname: string) => {
  const image = fs.readFileSync(pathname, 'base64');
  return image;
};

export const localImage = (name: string, dir = 'images') => {
  return Message.Image(null, null, null, readToBase64(path.join(__dirname, `../../assets/${dir}/${name}`)));
};

export type ReplyConfig = {
  receive: {
    text: string | string[];
    is_contains: boolean;
  };
  return: {
    text?: string;
    image?: string;
  };
};
export const readReplyConfig = () => {
  const file = fs.readFileSync(path.join(__dirname, '../../config/reply.yml'), 'utf-8');
  return y.load(file) as { list: ReplyConfig[] };
};

export const readCookMenuConfig = () => {
  const file = fs.readFileSync(path.join(__dirname, '../../config/cook-menu.yml'), 'utf-8');
  return y.load(file) as { list: string[] };
};

/**
 * 解析角色文件
 */
export const readArknightsCharacters = () => {
  const file = fs.readFileSync(path.join(__dirname, '../../config/arknights-menu.yml'), 'utf-8');

  return file.split('\n').map(item => {
    const character = item.split(',');
    return {
      id: character[0],
      name: character[1],
      rarity: character[2],
      from: character[3],
      time: character[4]
    };
  });
};

/**
 * 读取卡池信息
 */
export const readArknightsGacha = () => {
  const file = fs.readFileSync(path.join(__dirname, '../../config/arknights-gacha.yml'), 'utf-8');
  const config = (y.load(file) as Record<string, GachaConfig>[])[0];
  const limitConfig = config.limit;
  const normalConfig = config.normal;

  return {
    normal: {
      ...normalConfig,
      up: {
        ssr: {
          main: limitConfig?.up?.ssr?.main?.split?.('/') ?? [],
          sub: limitConfig?.up?.ssr?.sub?.split?.('/') ?? [],
          normal: limitConfig?.up?.ssr?.normal?.split?.('/') ?? []
        },
        sr: limitConfig?.up?.sr?.split?.('/') ?? []
      },
      all: {
        ssr: limitConfig.all.ssr.split('/'),
        sr: limitConfig.all.sr.split('/'),
        r: limitConfig.all.r.split('/'),
        n: limitConfig.all.n.split('/')
      }
    } as GachaConfig<string[]>,
    limit: {
      ...limitConfig,
      up: {
        ssr: {
          main: limitConfig?.up?.ssr?.main?.split?.('/') ?? [],
          sub: limitConfig?.up?.ssr?.sub?.split?.('/') ?? [],
          normal: limitConfig?.up?.ssr?.normal?.split?.('/') ?? []
        },
        sr: limitConfig?.up?.sr?.split?.('/') ?? []
      },
      all: {
        ssr: limitConfig.all.ssr.split('/'),
        sr: limitConfig.all.sr.split('/'),
        r: limitConfig.all.r.split('/'),
        n: limitConfig.all.n.split('/')
      }
    } as GachaConfig<string[]>
  };
};

/**
 * 读取敏感词
 */
export const readSensitiveWords = () => {
  try {
    const file = fs.readFileSync(path.join(__dirname, '../../config/sensitive_words_lines'), 'utf-8');
    return file.split('\n');
  } catch {
    return [];
  }
};

export const tarots = () => {
  const rootPath = assets('images/tarot/');

  return glob.sync(rootPath + '*.jpg').map(filePath => ({
    path: filePath.replace(rootPath, 'tarot/'),
    name: filePath.replace(rootPath, '').replace('.jpg', '')
  }));
};
