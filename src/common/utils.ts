import fs from 'fs';
import y from 'js-yaml';
import { Message } from 'mirai-ts';
import path from 'path';

export const noop = () => {};

export const readToBase64 = (pathname: string) => {
  const image = fs.readFileSync(pathname, 'base64');
  return image;
};

export const localImage = (name: string) => {
  return Message.Image(
    null,
    null,
    null,
    readToBase64(path.join(__dirname, `../../assets/images/${name}`))
  );
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

export const secondToDate = (time: number) => {
  var h = Math.floor(time / 3600);
  var m = Math.floor((time / 60) % 60);
  var s = Math.floor(time % 60);
  return h + '小时' + m + '分' + s + '秒';
};
