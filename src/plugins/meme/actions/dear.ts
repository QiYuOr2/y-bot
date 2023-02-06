import fs from 'fs';
import axios from 'axios';
import { Canvas, createCanvas, Image, loadImage } from 'canvas';
import GIFEncoder from 'gif-encoder';
import getPixels from 'get-pixels';
import { assets, localImage } from '../../../utils';

const tmpFilename = 'dear-result.gif';
const tmpPath = assets(`images/${tmpFilename}`);

const Avatar = {
  Width: 70,
  Height: 70
};
const xy = [
  [45, 110],
  [50, 110],
  [58, 110],
  [45, 115],
  [42, 120],
  [50, 120],
  [20, 150],
  [32, 135],
  [52, 110],
  [45, 110],
  [62, 110],
  [30, 140],
  [20, 150]
];

const getPixelsSync = (path: string) => new Promise<{ data: Uint8Array }>((resolve, reject) => {
  getPixels(path, (err, pixels) => {
    if (err) {
      reject(err);
    }
    resolve(pixels);
  });
});

export default async function dear(getTarget: () => number) {
  const target = getTarget();

  if (!target) { return; }
  const avatarUrl = `https://q.qlogo.cn/g?b=qq&nk=${target}&s=100`;
  const avatarResponse = await axios(avatarUrl, { responseType: 'arraybuffer' });
  const avatarBuffer = Buffer.from(avatarResponse.data);

  const encoder = new GIFEncoder(240, 240);
  const result = fs.createWriteStream(tmpPath);
  const pics = new Array(13).fill(0).map((_, i) => assets(`images/dears/${i}.png`));

  encoder.pipe(result);
  encoder.setQuality(20);
  encoder.setDelay(50);
  encoder.setRepeat(0);
  encoder.writeHeader();

  for (const i in pics) {
    const counter = Number(i);
    const pic = pics[counter];

    const canvas = createCanvas(240, 240);
    const ctx = canvas.getContext('2d');

    const drawAvatar = (avatar: Canvas | Image) => {
      const [x, y] = xy[counter];
      ctx.drawImage(avatar, x, y, Avatar.Width, Avatar.Height);
      return canvas.toDataURL();
    };

    const pixels = await loadImage(pic)
      .then((data) => ctx.drawImage(data, 0, 0))
      .then(() => loadImage(avatarBuffer))
      .then(drawAvatar)
      .then(getPixelsSync);

    encoder.addFrame(pixels.data);
    encoder.read();
  }

  encoder.finish();

  return localImage(tmpFilename);
}
