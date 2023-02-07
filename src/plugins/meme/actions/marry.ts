import { createCanvas, loadImage } from 'canvas';
import { assets, localImage } from '../../../utils';
import { avatar, createGif, getPixelsSync } from '../helper';

const TmpFilename = 'marry-result.gif';
const TmpPath = assets(`images/${TmpFilename}`);

const AvatarSize = 100;
const CanvasSize = {
  Width: 800 / 4,
  Height: 1080 / 4
};

const BackgroundPath = assets('images/marry.png');

export default async function marry(getTarget: () => number) {
  const target = getTarget();

  if (!target) { return; }

  const [encoder] = createGif(TmpPath, { w: CanvasSize.Width, h: CanvasSize.Height });

  const background = await loadImage(BackgroundPath);

  const canvas = createCanvas(CanvasSize.Width, CanvasSize.Height);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, CanvasSize.Width, CanvasSize.Height);

  const pixels = await avatar(target)
    .image
    .then((img) => ctx.drawImage(img, 50, 50, AvatarSize, AvatarSize))
    .then(() => ctx.drawImage(background, 0, 0, CanvasSize.Width, CanvasSize.Height))
    .then(() => canvas.toDataURL())
    .then(getPixelsSync);

  encoder.addFrame(pixels.data);
  encoder.read();

  encoder.finish();

  return localImage(TmpFilename);
}
