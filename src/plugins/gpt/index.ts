import axios from 'axios';
import { define } from '@/core/define';
import { GPTKey } from '@/utils';

interface Usage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}
interface Message {
  role: string;
  content: string;
}
interface Choice {
  message: Message;
  finish_reason: string;
  index: number;
}

interface GPTDTO {
  id: string;
  object: string;
  created: number;
  model: string;
  usage: Usage;
  choices: Choice[];
}

/**
 * @deprecated 代理失效
 */
export const gpt = define([''], async (ctx) => {
  if (ctx.message?.get('At')?.target === 2799397589 && ctx.message.plain) {
    const { data } = await axios.post<GPTDTO>(
      'https://qiyuor2-gpt.zeabur.app/proxy/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: ctx.message.plain }],
        temperature: 0.7
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GPTKey}`
        }
      }
    );

    console.log(data);

    return data.choices.map(c => c.message.content).join('\n');
  }
});
