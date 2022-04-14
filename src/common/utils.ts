import fs from 'fs';

export const readToBase64 = (pathname: string) => {
  const image = fs.readFileSync(pathname, 'base64');
  return image;
};
