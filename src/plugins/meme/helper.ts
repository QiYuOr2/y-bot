import fs from 'fs';
import axios from 'axios';
import { loadImage } from 'canvas';
import getPixels from 'get-pixels';
import GIFEncoder from 'gif-encoder';

type CreateGifOptions = {
  w: number
  h: number
  delay?: number
  quality?: number
  repeat?: number
}

export function createGif(savePath: string, options: CreateGifOptions): [GIFEncoder, fs.WriteStream] {
  const encoder = new GIFEncoder(options.w, options.h);
  const resultStream = fs.createWriteStream(savePath);

  encoder.pipe(resultStream);
  encoder.setQuality(options.quality ?? 20);
  encoder.setDelay(options.delay ?? 50);
  encoder.setRepeat(options.repeat ?? 0);
  encoder.writeHeader();

  return [encoder, resultStream];
}

export function getPixelsSync(path: string) {
  return new Promise<{ data: Uint8Array }>((resolve, reject) => {
    getPixels(path, (err, pixels) => {
      if (err) {
        reject(err);
      }
      resolve(pixels);
    });
  });
}

export function avatar(target: number) {
  const avatarUrl = `https://q.qlogo.cn/g?b=qq&nk=${target}&s=100`;

  let cacheData: ArrayBuffer;
  const getAvatarData = async () => {
    if (cacheData) {
      return cacheData;
    }
    const avatarResponse = await axios(avatarUrl, { responseType: 'arraybuffer' });
    cacheData = avatarResponse.data;
    return avatarResponse.data;
  };

  return {
    buffer: getAvatarData().then((data) => Buffer.from(data)),
    image: getAvatarData().then((data) => Buffer.from(data)).then(loadImage)
  };
}
