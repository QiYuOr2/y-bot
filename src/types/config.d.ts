/* eslint-disable no-unused-vars */
declare interface ReplyConfigReturnOptions {
  text?: string;
  image?: string;
}

declare interface ReplyConfig {
  receive: {
    text: string | string[];
    is_contains: boolean;
  };
  return: ReplyConfigReturnOptions;
}

declare interface GachaUp<T> {
  ssr: {
    main: T,
    sub: T,
  },
  sr: T
}

declare interface GachaConfig<T = string> {
  name: string
  up: GachaUp<T>
  all: {
    ssr: T
    sr: T
    r: T
    n: T
  }
}