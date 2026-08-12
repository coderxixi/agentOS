/*
 * @Author: coderxixi 976344695@qq.com
 * @Date: 2026-08-12 09:16:11
 * @LastEditors: coderxixi 976344695@qq.com
 * @LastEditTime: 2026-08-12 09:39:22
 * @FilePath: /agentOS/src/core/collaboration.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export interface CollaborationMessage {
  dispatchId: string;
  taskId: string;
  fromBotId: string;
  toBotId: string;
  round: number;
  maxRounds: number;
  workspaceDir: string;
  prompt: string;
}

export function collaborationTurnKey(message: CollaborationMessage): string {
  return `${message.taskId}:${message.round}:${message.toBotId}`;
}

export class CollaborationInbox {
  private readonly messages = new Map<string, CollaborationMessage>();

  register(message: CollaborationMessage): void {
    this.messages.set(message.dispatchId, message);
  }

  consume(
    dispatchId: string,
    toBotId: string,
  ): CollaborationMessage | undefined {
    const message = this.messages.get(dispatchId);
    if (!message || message.toBotId !== toBotId) return undefined;
    this.messages.delete(dispatchId);
    return message;
  }
}
