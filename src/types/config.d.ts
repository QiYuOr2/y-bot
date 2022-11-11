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
