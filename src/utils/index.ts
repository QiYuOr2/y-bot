export * from './config';
export * from './typeOf';

export const noop = () => {};

export const secondToDate = (time: number) => {
  var h = Math.floor(time / 3600);
  var m = Math.floor((time / 60) % 60);
  var s = Math.floor(time % 60);
  return h + '小时' + m + '分' + s + '秒';
};
