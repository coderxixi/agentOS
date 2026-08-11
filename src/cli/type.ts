/*
 * @Author: coderxixi 976344695@qq.com
 * @Date: 2026-08-10 08:38:33
 * @LastEditors: coderxixi 976344695@qq.com
 * @LastEditTime: 2026-08-11 14:59:53
 * @FilePath: /agentOS/src/cli/type.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export type CliId = 'claude' | 'codex';

export interface CliRunStats {
  durationMs?: number;
  turns?: number;
  totalTokens?: number;
  inputTokens?: number;
  outputTokens?: number;
  cacheReadTokens?: number;
  cacheCreationTokens?: number;
  contextUsedTokens?: number;
  contextWindowTokens?: number;
}

export type CliEvent =
  | { type: 'session'; sessionId: string }
  | {
    type: 'tool_start';
    toolUseId: string;
    toolName: string;
    label: string;
    detail?: string;
  }
  | { type: 'tool_end'; toolUseId: string; failed: boolean }
  | { type: 'context'; usedTokens: number }
  | { type: 'result'; answer: string; sessionId?: string; stats?: CliRunStats }
  | { type: 'error'; message: string; sessionId?: string };

export interface CliAdapter {
  readonly id: CliId;
  readonly command: string;
  readonly displayName: string;
  buildArgs(prompt: string): string[];
  buildResumeArgs(prompt: string, sessionId: string): string[];
  parseEvents(line: string): CliEvent[];
}

export interface CliRunResult {
  answer: string;
  sessionId?: string;
  stats?: CliRunStats;
}
