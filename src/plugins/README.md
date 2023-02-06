# Plugins

基本示例

```typescript
import { Message } from 'mirai-ts';
import Plugin from '../../core/plugin';

export class EatPlugin extends Plugin {
  constructor() {
    super();

    // 指令注册
    this.set(['.hello', '你好']).action(() => {
      return [Message.Plain(`Hello World`)];
    });

    // 定时任务
    this.timer(/* cron 表达式 */'0 */1 * * * ?').action(() => {
      return [Message.Plain(`Hello World`)];
    });
  }
}

```