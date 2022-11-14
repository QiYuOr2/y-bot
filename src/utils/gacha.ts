import { isUndefined } from "./typeOf";

export const fillArray = (count: number, fill: number | string = 0) => new Array(count).fill(fill);

export const counter = (probability: Array<[string, number]>, income: number = 1) => {
  const count = income; 
  const countMap = new Map<string, number>();

  const list = probability.map((item) => new Array(item[1]).fill(item[0])).flat() as string[];
  fillArray(count).forEach(() => {
    const current = list[Math.floor(Math.random() * list.length)];
    
    if (countMap.has(current)) {
      countMap.set(current, (countMap.get(current) || 0) + 1);
    } else {
      countMap.set(current, 1);
    }

  });

  return countMap;
};

export const Pool = (source: string[]) => {
  const length = source.length;

  return {
    one: () => {
      return source[Math.floor(Math.random() * length)];
    },
    get: (count?: number) => {
      const countMap: Record<string, number> = {};
      if (isUndefined(count)) {
        return countMap;
      }
      fillArray(count).forEach(() => {
        const current = source[Math.floor(Math.random() * length)];
        if (countMap[current]) {
          countMap[current] = countMap[current] + 1;
        } else {
          countMap[current] = 1;
        }
      });
      return countMap;
    }
  };
};