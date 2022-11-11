import { Message } from "mirai-ts";
import Plugin from "../../core/plugin";
import { readReplyConfig, localImage } from "../../utils";

export class AutoReplyPlugin extends Plugin {
  constructor() {
    super();

    const { list } = readReplyConfig();
    list.forEach((item) => {
      const isContains = item.receive.is_contains;
      Array.isArray(item.receive.text)
        ? item.receive.text.forEach((keyword) => {
            this.set(isContains ? new RegExp(keyword) : keyword).action(() => this.reply(item.return));
          })
        : this.set(isContains ? new RegExp(item.receive.text) : item.receive.text).action(() => this.reply(item.return));
    });
  }

  reply(returnOptions: ReplyConfigReturnOptions) {
    const result = [];
    returnOptions.image && result.push(localImage(returnOptions.image));
    returnOptions.text && result.push(Message.Plain(returnOptions.text));
    return result.length ? result : undefined;
  }
}
