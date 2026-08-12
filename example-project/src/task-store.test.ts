import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TaskStore } from './task-store.ts';

test('complete() 将任务标记为已完成并返回更新后的任务', () => {
  const store = new TaskStore();
  const added = store.add('t1', '写报告');

  const completed = store.complete('t1');

  assert.equal(completed.id, 't1');
  assert.equal(completed.completed, true);
  assert.notEqual(completed, added, '返回的是副本而不是内部引用');
});

test('重复完成同一任务保持幂等', () => {
  const store = new TaskStore();
  store.add('t1', '写报告');

  store.complete('t1');
  const second = store.complete('t1');

  assert.equal(second.completed, true);
});

test('找不到任务时抛出包含任务 ID 的明确错误', () => {
  const store = new TaskStore();
  store.add('t1', '写报告');

  assert.throws(() => store.complete('missing'), /missing/);
});

test('完成一个任务不会改变其他任务', () => {
  const store = new TaskStore();
  store.add('t1', '写报告');
  store.add('t2', '读代码');

  store.complete('t1');

  const others = store.list();
  assert.equal(others.find((t) => t.id === 't1')!.completed, true);
  assert.equal(others.find((t) => t.id === 't2')!.completed, false);
});
