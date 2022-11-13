export * from './config';
export * from './typeOf';

export const noop = () => {};

export const secondToDate = (time: number) => {
  let h = Math.floor(time / 3600);
  let m = Math.floor((time / 60) % 60);
  let s = Math.floor(time % 60);
  return h + '小时' + m + '分' + s + '秒';
};

export const Counter = (probability: Array<[string, number]>, income: number = 1) => {
  const count = income; 
  const countMap = new Map<string, number>();

  const list = probability.map((item) => new Array(item[1]).fill(item[0])).flat() as string[];
  new Array(count).fill(0).forEach(() => {
    const current = list[Math.floor(Math.random() * list.length)];
    
    if (countMap.has(current)) {
      countMap.set(current, (countMap.get(current) || 0) + 1);
    } else {
      countMap.set(current, 1);
    }

  });

  return countMap;
};