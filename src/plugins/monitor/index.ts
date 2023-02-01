import Plugin from '../../core/plugin';

export class MonitorPlugin extends Plugin {
  constructor() {
    super();

    // 每分钟执行一次
    this.timer('0 */1 * * * ?').action(() => {
      // this.context.mirai.api.sendGroupMessage([], 708376391);
    });
  }
}
