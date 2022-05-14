// import { Message, MessageType, template } from 'mirai-ts';
// import { isPromise } from 'util/types';
// import { rollFood } from './eat';
// import { hitokoto } from './hitokoto';
// import { atk } from './atk';
// import { fate } from './roll';
// import { anime } from './bangumi';
// import { bili, weibo } from './hot';
// import { toNihon } from './transfor';
// import { biliVideo, info } from './search';
// import { gen500 } from './gen';
// import { localImage, readCookMenuConfig, readReplyConfig, ReplyConfig } from '../common/utils';

// type Action = (...args: any) => MessageType.MessageChain | Promise<MessageType.MessageChain>;

// export class YCommand {
//   commands: Record<string, Action>;
//   replyConfig: { list: ReplyConfig[] };
//   constructor() {
//     this.commands = {
//       eat: rollFood(readCookMenuConfig().list),
//       hello: hitokoto,
//       help: this.help,
//       atk,
//       roll: this.roll,
//       daily: anime,
//       hot: this.hot,
//       t: this.transfor,
//       ['成分']: (options: any[]) => {
//         const [, , uid] = options;
//         return info(uid);
//       },
//       meme1: gen500,
//     };

//     this.replyConfig = readReplyConfig();
//   }

//   help() {
//     const helpText = [
//       '当前支持指令:',
//       '/eat [roll一个饭/菜]',
//       '/hello [一言]',
//       '/atk @user [你攻击性好强]',
//       '/roll 1 [抽个签]',
//       '/roll 10 [抽十个签]',
//       '/daily [今日更新的番剧]',
//       '/hot bili [b站当前热搜]',
//       '/hot weibo [微博当前热搜]',
//       '/t 随便写点什么 [用平假名标记文字]',
//       '/成分 B站UID [查b站信息]',
//       '/meme1 上面的文字 下面的文字 [5000万日元梗图]',
//     ];
//     return [Message.Plain(helpText.join('\n'))];
//   }

//   roll(options: any[]) {
//     const [, , flag] = options;
//     console.log(options);
//     switch (Number(flag)) {
//       case 1:
//         return fate();
//       case 10:
//         return fate(10);
//       default:
//         return [Message.Plain('暂不支持该参数喵！')];
//     }
//   }

//   hot(options: any[]) {
//     const [, , flag] = options;
//     switch (flag) {
//       case 'bili':
//         return bili();
//       case 'weibo':
//         return weibo();
//       default:
//         return [Message.Plain('暂不支持该参数喵！')];
//     }
//   }

//   transfor(options: any[]) {
//     const [, , msg] = options;
//     return toNihon(msg);
//   }

//   async searchBiliVideo(msg: string) {
//     if (msg.search(/BV([0-9]|[a-z]|[A-Z])*/) !== -1) {
//       const bv = msg.match(/BV([0-9]|[a-z]|[A-Z])*/)![0];
//       console.log('bv: ', bv);
//       const result = await biliVideo(bv);
//       return result;
//     }
//     return null;
//   }

//   //#region 自动回复
//   #returnMsg(returnOptions: { text?: string; image?: string }) {
//     let result = [];
//     returnOptions.image && result.push(localImage(returnOptions.image));
//     returnOptions.text && result.push(Message.Plain(returnOptions.text));
//     return result.length ? result : null;
//   }

//   #receiveContainsHandler(config: ReplyConfig, msg: string) {
//     if (Array.isArray(config.receive.text)) {
//       return config.receive.text.some((key) => msg.includes(key))
//         ? this.#returnMsg(config.return)
//         : null;
//     }
//     return msg.includes(config.receive.text) ? this.#returnMsg(config.return) : null;
//   }

//   #receiveEqHandler(config: ReplyConfig, msg: string) {
//     if (Array.isArray(config.receive.text)) {
//       return config.receive.text.some((key) => msg === key) ? this.#returnMsg(config.return) : null;
//     }
//     return msg === config.receive.text ? this.#returnMsg(config.return) : null;
//   }

//   autoReply(msg: string) {
//     const { list } = this.replyConfig;
//     let result = null;
//     for (let i = 0; i < list.length; i++) {
//       const item = list[i];
//       result =
//         item.receive.is_contains === true
//           ? this.#receiveContainsHandler(item, msg)
//           : this.#receiveEqHandler(item, msg);
//       if (result) {
//         break;
//       }
//     }
//     return result;
//   }
//   //#endregion

//   async exec(name: string, options: any[]) {
//     if (Object.keys(this.commands).includes(name)) {
//       const action = this.commands[name];
//       if (isPromise(action)) {
//         return await action(options);
//       }
//       return action(options);
//     }

//     return [Message.Plain('暂不支持该指令喵！')];
//   }
// }
