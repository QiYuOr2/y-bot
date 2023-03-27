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

export const gpt = define(['', '.ai'], async (ctx) => {
  if (ctx.message?.get('At')?.target === 2799397589 && ctx.message.plain) {
    const { data } = await axios.post<GPTDTO>('https://qiyuor2-gpt.zeabur.app/proxy/v1/chat/completions', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GPTKey}`
      },
      data: {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: ctx.message.plain }],
        temperature: 0.7
      }
    });

    console.log(data);

    return data.choices.map(c => c.message.content).join('\n');
  }
});
