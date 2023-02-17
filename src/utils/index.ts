export * from './config';
export * from './typeOf';
export * from './gacha';

export const noop = () => {
};

export const secondToDate = (time: number) => {
  const h = Math.floor(time / 3600);
  const m = Math.floor((time / 60) % 60);
  const s = Math.floor(time % 60);
  return h + '小时' + m + '分' + s + '秒';
};

export function omit<T, K extends keyof T>(target: T, ...keys: K[]) {
  function action(obj: Omit<T, K>, key: K): Omit<T, K> {
    // eslint-disable-next-line no-unused-vars
    const { [key]: _, ...rest } = obj;

    if (keys.length === 0) {
      return rest as T;
    }

    return action(rest as T, keys.pop()!);
  }

  return action(target, keys.pop()!);
}

/**
 * 包装为数组
 */
export function wrapArray<T>(raw: T | T[]) {
  return !Array.isArray(raw) ? [raw] : raw;
}

export function parsePlain(raw: string) {
  const prefix = /^(--|-)/;

  return raw.split(' ')
    .slice(1)
    .reduce<{ _: string[] } & Record<string, any>>((result, current) => {
      if (!prefix.test(current)) {
        result._ = result._ ? [...result._, current] : [current];
        return result;
      }

      if (current.indexOf('=') !== -1) {
        // --key=value
        const [key, value] = current.replace(/^(--|-)/, '').split('=');
        result[key] = value;
      } else {
        // --key
        const key = current.replace(/^(--|-)/, '');
        result[key] = true;
      }
      return result;
    }, { _: [] });
}
