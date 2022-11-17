export interface ReplyConfigReturnOptions {
  text?: string;
  image?: string;
}

export interface ReplyConfig {
  receive: {
    text: string | string[];
    is_contains: boolean;
  };
  return: ReplyConfigReturnOptions;
}

export interface GachaUp<T> {
  ssr: {
    main: T,
    normal: T,
    sub: T,
  },
  sr: T
}

export interface GachaConfig<T = string> {
  name: string
  up: GachaUp<T>
  all: {
    ssr: T
    sr: T
    r: T
    n: T
  }
}
