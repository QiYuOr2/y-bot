import axios from 'axios';
import { Message } from 'mirai-ts';
import { secondToDate } from '../common/utils';
import { Service } from '../core/decorators';

@Service()
export class BiliService {
  async hot() {
    const { data } = await axios.get(
      'http://s.search.bilibili.com/main/hotword'
    );
    const { list } = data;
    return [
      Message.Plain('bilibili当前热搜\n========\n'),
      ...list.map((item: any, i: number) =>
        Message.Plain(`${item.show_name}${i !== list.length - 1 ? '\n' : ''}`)
      ),
    ];
  }

  async info(uid: string) {
    const { data } = await axios.get(
      `https://api.bilibili.com/x/space/acc/info?mid=${uid}`
    );

    const name = `昵称：${data.data.name}`;
    const level = `等级：${data.data.level}${
      data.data.is_senior_member ? ' 硬核' : ''
    }`;
    const fansMedal = data.data?.fans_medal?.medal
      ? `粉丝牌：[${data.data.fans_medal.medal.medal_name} ${data.data.fans_medal.medal.level}]`
      : '';
    const vip = data.data.vip ? data.data.vip.label.text : '';
    const pendant =
      data.data.pendant && data.data.pendant.name
        ? `头像框：${data.data.pendant.name}`
        : '';
    return [
      Message.Plain(
        [`uid：${uid}`, name, level, fansMedal, pendant, vip]
          .filter((item) => item !== '')
          .join('\n')
      ),
      Message.Plain('\n'),
      Message.Image(null, data.data.face),
    ];
  }

  async video(bv: string) {
    const { data } = await axios.get(
      `https://api.bilibili.com/x/web-interface/view?bvid=${bv}`
    );
    if (!data.data) {
      return [Message.Plain('找不到这个视频~')];
    }
    const source = data.data;
    return [
      // bv
      Message.Plain(`${source.bvid}\n`),
      // 子分区
      Message.Plain(`${source.tname}\n`),
      // 标题
      Message.Plain(`标题：${source.title}\n`),
      // 封面
      Message.Image(null, source.pic),
      // 简介
      Message.Plain(`\n简介：${source.desc}\n`),
      // 作者
      Message.Plain(`作者：${source.owner.name}（${source.owner.mid}）\n`),
      // 视频数据
      Message.Plain(
        `播放：${source.stat.view}##点赞：${source.stat.like}##收藏：${source.stat.favorite}##投币：${source.stat.coin}\n`
      ),
      // 时长
      Message.Plain(`时长：${secondToDate(source.duration)}\n`),
      // 视频地址
      Message.Plain(`https://www.bilibili.com/video/${bv}`),
    ];
  }
}
