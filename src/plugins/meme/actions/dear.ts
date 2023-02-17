import { Canvas, createCanvas, Image, loadImage } from 'canvas';
import { assets, localImage } from '../../../utils';
import { avatar, createGif, getPixelsSync } from '../helper';

const TmpFilename = 'dear-result.gif';
const TmpPath = assets(`images/${TmpFilename}`);

const Avatar = {
  Width: 70,
  Height: 70
};
const XY = [
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

export default async function dear(target?: string | number) {
  if (!target) { return; }

  const avatarBuffer = await avatar(target).buffer;

  const [encoder] = createGif(TmpPath, { w: 240, h: 240 });

  const pics = new Array(13).fill(0).map((_, i) => assets(`images/dears/${i}.png`));

  for (const i in pics) {
    const counter = Number(i);
    const pic = pics[counter];

    const canvas = createCanvas(240, 240);
    const ctx = canvas.getContext('2d');

    const drawAvatar = (avatar: Canvas | Image) => {
      const [x, y] = XY[counter];
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

  return localImage(TmpFilename);
}
