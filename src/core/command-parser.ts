/*
 * @Author: coderxixi 976344695@qq.com
 * @Date: 2026-08-06 10:35:35
 * @LastEditors: coderxixi 976344695@qq.com
 * @LastEditTime: 2026-08-06 10:35:43
 * @FilePath: /agentOS/src/core/command-parser.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export type CommandName = 'close' | 'status' | 'help';

export interface SlashCommand {
  name: CommandName;
}

const COMMAND_RE = /^(?:@.+\s+)?\/(close|status|help)\s*$/;

export function parseCommand(text: string): SlashCommand | undefined {
  const match = COMMAND_RE.exec(text.trim());
  if (!match) return undefined;
  return { name: match[1] as CommandName };
}
