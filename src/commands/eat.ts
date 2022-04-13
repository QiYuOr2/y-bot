import { Message } from 'mirai-ts';

const foodList = [
  '黄焖鸡',
  '炸酱面',
  '鸡公煲',
  '西红柿鸡蛋盖饭',
  '麻婆豆腐盖饭',
  '麦当劳',
  '猪脚饭',
  '韩式炸鸡',
  '北京烤鸭',
  '凉皮+肉夹馍',
  '炸串',
  '烤冷面',
  '手抓饼',
  '水饺',
  '中式炸鸡',
  '烧烤',
  '农家小炒肉盖饭',
  '蔬菜沙拉',
  '黑椒牛柳盖饭',
  '螺蛳粉',
  '武汉热干面',
  '华莱士（小心喷射）',
  '麻辣香锅',
  '红烧肉',
  '火锅',
  '香煎鸡胸健康餐',
  '披萨',
  '麻辣烫',
  '泡面（不要酸菜）',
];

export const rollFood = (options: any[]) => {
  return [
    Message.At(options[0]),
    Message.Plain(`今天吃【${foodList[Math.floor(Math.random() * foodList.length)]}】吧！`),
  ];
};
