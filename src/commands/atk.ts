import { Message, MessageType } from 'mirai-ts';

export const atk = (options: any[]) => {
  const [, messageChain] = options;
  console.log(messageChain)
  const targets = messageChain.filter((item: MessageType.At) => item.type === 'At');
  return [
    ...targets.map((item: MessageType.At) => Message.At(item.target)),
    Message.Plain(`小笨蛋！`),
  ];
};
