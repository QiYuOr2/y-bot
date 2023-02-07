import axios from 'axios';
import { loadImage } from 'canvas';
import getPixels from 'get-pixels';

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
