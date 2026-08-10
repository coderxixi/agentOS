/*
 * @Author: coderxixi 976344695@qq.com
 * @Date: 2026-08-10 09:45:44
 * @LastEditors: coderxixi 976344695@qq.com
 * @LastEditTime: 2026-08-10 09:45:52
 * @FilePath: /agentOS/src/core/task-abort.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export interface ActiveRun {
  controller: AbortController;
  ownerOpenId: string;
  cancelMode?: 'stop' | 'close';
}

export type AbortTaskOutcome =
  | 'stopped'
  | 'already_stopping'
  | 'not_found'
  | 'forbidden';

export function requestTaskAbort(
  activeRuns: Map<string, ActiveRun>,
  sessionId: string,
  operatorOpenId: string,
): AbortTaskOutcome {
  const active = activeRuns.get(sessionId);
  if (!active) return 'not_found';
  if (operatorOpenId !== active.ownerOpenId) return 'forbidden';
  if (active.controller.signal.aborted) return 'already_stopping';
  active.cancelMode = 'stop';
  active.controller.abort();
  return 'stopped';
}
