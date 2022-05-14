import { ICommand } from '../core/use-command';
import { Command, Inject, Options } from '../decorators';
import { BiliService } from '../services';

@Command('bili')
export class Bili implements ICommand {
  @Inject() private biliService!: BiliService;

  @Options('user', '用户信息查询')
  info(uid: string) {
    return this.biliService.info(uid);
  }

  @Options('video', 'BV号查询视频')
  video(bv: string) {
    return this.biliService.info(bv);
  }
}
