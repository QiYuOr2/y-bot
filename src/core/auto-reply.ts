import { Message } from "mirai-ts";
import { localImage, readReplyConfig, ReplyConfig } from "../common/utils";

function returnMsg(returnOptions: { text?: string; image?: string }) {
  let result = [];
  returnOptions.image && result.push(localImage(returnOptions.image));
  returnOptions.text && result.push(Message.Plain(returnOptions.text));
  return result.length ? result : null;
}

function containsHandler(config: ReplyConfig, msg: string) {
  if (Array.isArray(config.receive.text)) {
    return config.receive.text.some((key) => msg.includes(key)) ? returnMsg(config.return) : null;
  }
  return msg.includes(config.receive.text) ? returnMsg(config.return) : null;
}

function equalsHandler(config: ReplyConfig, msg: string) {
  if (Array.isArray(config.receive.text)) {
    return config.receive.text.some((key) => msg === key) ? returnMsg(config.return) : null;
  }
  return msg === config.receive.text ? returnMsg(config.return) : null;
}

export function autoReply(msg: string) {
  const { list } = readReplyConfig();
  let result = null;
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    result = item.receive.is_contains === true ? containsHandler(item, msg) : equalsHandler(item, msg);
    if (result) {
      break;
    }
  }
  return result;
}
