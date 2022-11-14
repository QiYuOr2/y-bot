# Plugins

基本示例

```typescript
import { Message } from 'mirai-ts';
import Plugin from '../../core/plugin';

export class EatPlugin extends Plugin {
  constructor() {
    super();

    this.set(['.hello', '你好']).action(() => {
      return [Message.Plain(`Hello World`)];
    });
  }
}

```
