/*
 * @Author: coderxixi 976344695@qq.com
 * @Date: 2026-08-11 15:00:37
 * @LastEditors: coderxixi 976344695@qq.com
 * @LastEditTime: 2026-08-11 15:00:45
 * @FilePath: /agentOS/src/cli/registry.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ClaudeAdapter } from './claude-adapter.js';
import { CodexAdapter } from './codex-adapter.js';
import type { CliAdapter, CliId } from './types.js';

const adapters: Record<CliId, CliAdapter> = {
  claude: new ClaudeAdapter(),
  codex: new CodexAdapter(),
};

export function getCliAdapter(id: CliId): CliAdapter {
  return adapters[id];
}

export function listCliAdapters(): CliAdapter[] {
  return Object.values(adapters);
}

export function parseCliId(value: string | undefined): CliId {
  if (!value) return 'claude';
  if (value === 'claude' || value === 'codex') return value;
  throw new Error(`不支持的 DEFAULT_CLI: ${value}，请填写 claude 或 codex`);
}
