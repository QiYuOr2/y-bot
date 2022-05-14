import { readCookMenuConfig } from '../common/utils';
import { ICommand } from '../core/use-command';
import { Command, Inject, Options } from '../decorators';
import { CommonService } from '../services';

const foodList = readCookMenuConfig().list;

@Command('common', { notUseName: true })
export class Common implements ICommand {
  @Inject() commonService!: CommonService;

  @Options('eat', '吃点啥')
  eat(message: any) {
    const { type, sender } = message;

    return this.commonService.eat(
      foodList,
      sender.id,
      type === 'FriendMessage'
    );
  }

  @Options('hi', '你好')
  hi() {
    return this.commonService.hitokoto();
  }

  @Options('daily', '每日放送')
  daily() {
    return this.commonService.anime();
  }
}
