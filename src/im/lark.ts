
import * as Lark from '@larksuiteoapi/node-sdk';

export interface IncomingMessage {
   messageId: string;
   chatId:string;
  chatType: string; //群聊类型 'p2p' 单聊 | 'group' 群聊

}