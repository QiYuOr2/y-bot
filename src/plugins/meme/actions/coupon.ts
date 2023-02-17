import { Canvas, Image, createCanvas, loadImage } from 'canvas';
import { assets, localImage } from '../../../utils';
import { avatar, createGif, getPixelsSync } from '../helper';

const TmpFilename = 'coupon-result.gif';
const TmpPath = assets(`images/${TmpFilename}`);

const AvatarSize = 65;
const CanvasSize = {
  Width: 500,
  Height: 355
};

const BackgroundPath = assets('images/coupon.png');

export default async function coupon(target?: string | number) {
  if (!target) { return; }

  const [encoder] = createGif(TmpPath, { w: CanvasSize.Width, h: CanvasSize.Height });

  const canvas = createCanvas(CanvasSize.Width, CanvasSize.Height);
  const ctx = canvas.getContext('2d');

  const background = await loadImage(BackgroundPath);
  ctx.drawImage(background, 0, 0, CanvasSize.Width, CanvasSize.Height);

  const drawAvatar = (avatar: Canvas | Image) => {
    const avatarCanvas = createCanvas(AvatarSize, AvatarSize);
    const avatarCtx = avatarCanvas.getContext('2d');

    avatarCtx.translate(AvatarSize / 2, AvatarSize / 2);
    avatarCtx.rotate(336 * Math.PI / 180);
    avatarCtx.translate(-AvatarSize / 2, -AvatarSize / 2);

    avatarCtx.beginPath();
    avatarCtx.arc(AvatarSize / 2, AvatarSize / 2, AvatarSize / 2, 0, Math.PI * 2, false);
    avatarCtx.clip();
    avatarCtx.drawImage(avatar, 0, 0, AvatarSize, AvatarSize);
    avatarCtx.restore();
    return avatarCanvas.toDataURL();
  };

  const pixels = await avatar(target)
    .image
    .then(drawAvatar)
    .then(loadImage)
    .then((img) => ctx.drawImage(img, 110, 200))
    .then(() => canvas.toDataURL())
    .then(getPixelsSync);

  encoder.addFrame(pixels.data);
  encoder.read();

  encoder.finish();

  return localImage(TmpFilename);
}
