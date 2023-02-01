import { Message } from 'mirai-ts';
import Plugin from '../../core/plugin';

export class MonitorPlugin extends Plugin {
  constructor() {
    super();

    // 每分钟执行一次
    this.timer('0 */1 * * * ?').action(() => {
      return [Message.Plain('')];
    });
  }
}
