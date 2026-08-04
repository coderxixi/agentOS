/*
 * @Author: coderxixi 976344695@qq.com
 * @Date: 2026-08-04 15:49:50
 * @LastEditors: coderxixi 976344695@qq.com
 * @LastEditTime: 2026-08-04 16:29:09
 * @FilePath: /agentOS/src/im/lark.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import * as Lark from '@larksuiteoapi/node-sdk';

export interface IncomingMessage {
  messageId: string;
  chatId:string;
  chatType: string; //群聊类型 'p2p' 单聊 | 'group' 群聊,
  messageType: string; //消息类型 'text' 文本 | 'image' 图片 | 'file' 文件 | 'audio' 音频 | 'video' 视频 | 'location' 位置 | 'link' 链接 | 'sticker' 表情 | 'interactive' 交互式 | 'share' 分享 | 'recall' 撤回 | 'mention' 提及 | 'custom' 自定义 | 'system' 系统 | 'event' 事件 | 'other' 其他
  text:string;
  senderOpenId:string;
} 

export interface BotOptions {
  appId: string;
  appSecret: string;
  onMessage: (message: IncomingMessage) => void;
} 

export interface Bot {
  client:Lark.Client;
  reply:(messageId:string,text:string) => Promise<void>;
}

function extractText(messageType:string,content:string):string {
  console.log('extractText',messageType,content);
  
  const parsed = JSON.parse(content);
  if (messageType === 'text') {
    return parsed.text ?? '';
  }
  if(messageType=== 'post'){
    const paragtaphs: any[][] = parsed.content ??[];
     return paragtaphs
     .flat()
     .filter((el)=>el.tag==='text')
     .map((el)=>el.text)
     .join('')
     .trim()
  }

  return ''
}

export function startBot(opts: BotOptions): Bot {
  const { appId, appSecret, onMessage } = opts;

  const client = new Lark.Client({ appId, appSecret });

  const bot: Bot = {
    client,
    async reply(messageId, text) {
      const res = await client.im.v1.message.reply({
        path: { message_id: messageId },
        data: { msg_type: 'text', content: JSON.stringify({ text }) },
      });
      return res.data?.message_id;
    },
  };

  const dispatcher = new Lark.EventDispatcher({}).register({
    'im.message.receive_v1': async (data) => {
      const m = data.message;
      const msg: IncomingMessage = {
        messageId: m.message_id,
        chatId: m.chat_id,
        chatType: m.chat_type,
        messageType: m.message_type,
        text: extractText(m.message_type, m.content),
        senderOpenId: data.sender.sender_id?.open_id ?? '',
      };
      await onMessage(msg, bot);
    },
  });

  const wsClient = new Lark.WSClient({ appId, appSecret });
  wsClient.start({ eventDispatcher: dispatcher });

  return bot;
}