export function typeIs<T>(value: unknown): T {
  return value as T;
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}

/**
 * 是否为正则格式的字符串 eg. `/\.rd/`
 * @param value
 * @returns
 */
export function isRegExpString(value: string) {
  return value.slice(0, 1) === '/' && value.slice(value.length - 1) === '/' && value.length > 2;
}
