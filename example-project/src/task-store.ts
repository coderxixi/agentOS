/*
 * @Author: coderxixi 976344695@qq.com
 * @Date: 2026-08-12 09:33:07
 * @LastEditors: coderxixi 976344695@qq.com
 * @LastEditTime: 2026-08-12 09:41:13
 * @FilePath: /agentOS/example-project/src/task-store.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export class TaskStore {
  private readonly tasks = new Map<string, Task>();

  add(id: string, title: string): Task {
    if (!id.trim()) throw new Error('任务 ID 不能为空');
    if (!title.trim()) throw new Error('任务标题不能为空');
    if (this.tasks.has(id)) throw new Error(`任务已经存在: ${id}`);
    const task = { id, title: title.trim(), completed: false };
    this.tasks.set(id, task);
    return { ...task };
  }

  list(): Task[] {
    return [...this.tasks.values()].map((task) => ({ ...task }));
  }

  complete(id: string): Task {
    const task = this.tasks.get(id);
    if (!task) throw new Error(`任务不存在: ${id}`);
    task.completed = true;
    return { ...task };
  }
}
