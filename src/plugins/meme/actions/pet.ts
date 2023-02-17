import { createCanvas, Image, Canvas, loadImage } from 'canvas';
import { assets, localImage } from '../../../utils';
import { avatar, createGif, getPixelsSync } from '../helper';

const TmpFilename = 'pet-result.gif';
const TmpPath = assets(`images/${TmpFilename}`);

const AvatarSize = 80;
const CanvasSize = 120;

const SpritePath = assets('images/pet.png');
const SpriteWidth = 112;

const SpriteSizes = [
  [20, 40, AvatarSize, AvatarSize],
  [10, 50, AvatarSize + 20, AvatarSize - 10],
  [15, 45, AvatarSize + 10, AvatarSize - 5],
  [10, 50, AvatarSize + 20, AvatarSize - 10],
  [20, 40, AvatarSize, AvatarSize]
];

export default async function pet(target?: string | number) {
  if (!target) { return; }

  const [encoder] = createGif(TmpPath, { w: CanvasSize, h: CanvasSize });

  const sprite = await loadImage(SpritePath);

  for (let counter = 0; counter < 5; counter++) {
    const canvas = createCanvas(CanvasSize, CanvasSize);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, CanvasSize, CanvasSize);

    const drawSprite = () => {
      const spriteCanvas = createCanvas(SpriteWidth, SpriteWidth);
      const spriteCtx = spriteCanvas.getContext('2d');
      spriteCtx.drawImage(sprite, -SpriteWidth * counter, 0);
      ctx.drawImage(spriteCanvas, 0, 0);
    };

    const drawAvatar = (avatar: Canvas | Image) => {
      const [x, y, w, h] = SpriteSizes[counter];
      ctx.drawImage(avatar, x, y, w, h);
    };

    const pixels = await avatar(target)
      .image
      .then(drawAvatar)
      .then(drawSprite)
      .then(() => canvas.toDataURL())
      .then(getPixelsSync);

    encoder.addFrame(pixels.data);
    encoder.read();
  }

  encoder.finish();

  return localImage(TmpFilename);
}
