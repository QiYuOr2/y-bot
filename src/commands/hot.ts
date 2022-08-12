import { ICommand } from '../core/use-command';
import { Command, Inject, Options } from '../core/decorators';
import { BiliService, WeiboService } from '../services';

@Command('hot')
export class Hot implements ICommand {
  @Inject() private biliService!: BiliService;
  @Inject() private weiboService!: WeiboService;

  @Options('bili', 'B站热搜')
  bili() {
    return this.biliService.hot();
  }

  @Options('weibo', '微博热搜')
  weibo() {
    return this.weiboService.hot();
  }
}
