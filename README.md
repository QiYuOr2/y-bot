# Y Bot

群机器人，能够自定义各种插件

## 功能

- [ ] 支持通过页面配置自动回复消息
- [ ] 部分内容配置化
- [x] 关键词自动回复
- [x] roll点
- [x] 抽卡模拟
- [x] 定时任务
- [x] 明日方舟 bilibili 最新动态监控
- [x] 表情包
  - [x] 狂亲
  - [x] 摸摸
  - [x] 结婚登记表
- [x] 塔罗牌生成

## 部署项目

1. 安装 [MCL](https://github.com/mamoe/mirai/blob/dev/docs/ConsoleTerminal.md)
2. 将 `main.ts` 中的配置文件路径 `../../../app/mcl/config/net.mamoe.mirai-api-http/setting.yml` 替换为你的配置文件路径
3. 安装项目依赖并运行

```shell
pnpm install # or npm install

pnpm add pm2 -g # or npm install pm2 -g

pnpm deploy # or npm run deploy
```

## 鸣谢

特别感谢 [JetBrains](https://jb.gg/OpenSourceSupport.) 为开源项目提供免费的 IntelliJ IDEA 等 IDE 的授权

<img width="200" height="200" src="https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.png?_ga=2.194417903.397015689.1676440074-134452812.1665640168&_gl=1*oewnch*_ga*MTM0NDUyODEyLjE2NjU2NDAxNjg.*_ga_9J976DJZ68*MTY3NjQ0MDA3My40LjEuMTY3NjQ0MDUxMi42MC4wLjA." />

- [mirai](https://github.com/mamoe/mirai)
- [mirai-ts](https://github.com/YunYouJun/mirai-ts)
- [genshin-kit](https://www.npmjs.com/package/@genshin-kit/core)
