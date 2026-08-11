/*
 * @Author: coderxixi 976344695@qq.com
 * @Date: 2026-08-11 15:32:02
 * @LastEditors: coderxixi 976344695@qq.com
 * @LastEditTime: 2026-08-11 15:32:10
 * @FilePath: /agentOS/src/core/workspace.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { stat } from 'node:fs/promises';
import { isAbsolute, resolve } from 'node:path';

export function resolveWorkspacePath(
  input: string,
  baseDirectory = process.cwd(),
): string {
  const value = input.trim();
  if (!value) throw new Error('工作目录不能为空');
  return isAbsolute(value) ? resolve(value) : resolve(baseDirectory, value);
}

export async function ensureWorkspaceDirectory(path: string): Promise<void> {
  let info;
  try {
    info = await stat(path);
  } catch {
    throw new Error(`工作目录不存在: ${path}`);
  }
  if (!info.isDirectory()) throw new Error(`工作目录不是文件夹: ${path}`);
}
