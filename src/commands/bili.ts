import { ICommand } from "../core/use-command";
import { Command, Inject, Options, Skip } from "../core/decorators";
import { BiliService } from "../services";

@Skip
@Command("bili")
export class Bili implements ICommand {
  @Inject() private biliService!: BiliService;

  @Options("user", "UID查询用户信息")
  info(message: any) {
    const { msgOptions } = message;
    return this.biliService.info(msgOptions[0]);
  }

  // @Options("video", "BV号查询视频")
  // video(message: any) {
  //   const { msgOptions } = message;
  //   return this.biliService.info(msgOptions);
  // }
}