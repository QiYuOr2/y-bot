import { ICommand } from '../core/use-command';
import { Command, Inject, Options } from '../core/decorators';
import { RollService } from '../services';

@Command('roll')
export class Roll implements ICommand {
  @Inject() rollService!: RollService;

  @Options('1', '抽一个签')
  one() {
    return this.rollService.fate(1);
  }

  @Options('10', '抽十个签')
  ten() {
    return this.rollService.fate(10);
  }
}
