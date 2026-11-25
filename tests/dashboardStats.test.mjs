import test from 'node:test';
import assert from 'node:assert/strict';
import { getDashboardStats, getPracticeDay } from '../src/utils/dashboardStats.js';

function completions(...dates) {
  return dates.map((completedAt, index) => ({ id: `completion-${index}`, completedAt }));
}

test('new users have zero completed exercises and zero streak', () => {
  assert.deepEqual(getDashboardStats([], new Date('2026-11-24T12:00:00Z')), { completedExercises: 0, streak: 0 });
});

test('each round counts, but multiple rounds on one day only add one streak day', () => {
  const records = completions('2026-11-24T08:00:00Z', '2026-11-24T09:00:00Z', '2026-11-24T10:00:00Z');
  assert.deepEqual(getDashboardStats(records, new Date('2026-11-24T12:00:00Z')), { completedExercises: 3, streak: 1 });
});

test('consecutive practice days ending today form a streak', () => {
  const records = completions('2026-11-21T12:00:00Z', '2026-11-22T12:00:00Z', '2026-11-23T12:00:00Z', '2026-11-24T10:00:00Z');
  assert.equal(getDashboardStats(records, new Date('2026-11-24T12:00:00Z')).streak, 4);
});

test('yesterday’s streak stays active until today has been missed', () => {
  const records = completions('2026-11-21T12:00:00Z', '2026-11-22T12:00:00Z', '2026-11-23T12:00:00Z');
  assert.equal(getDashboardStats(records, new Date('2026-11-24T12:00:00Z')).streak, 3);
  assert.equal(getDashboardStats(records, new Date('2026-11-25T12:00:00Z')).streak, 0);
});

test('practice after a missed day starts a new streak while keeping the total', () => {
  const records = completions('2026-11-21T12:00:00Z', '2026-11-22T12:00:00Z', '2026-11-24T10:00:00Z');
  assert.deepEqual(getDashboardStats(records, new Date('2026-11-24T12:00:00Z')), { completedExercises: 3, streak: 1 });
});

test('Swiss midnight, rather than UTC midnight, defines the practice day', () => {
  assert.equal(getPracticeDay('2026-11-23T23:30:00Z'), getPracticeDay('2026-11-24T12:00:00Z'));
  const records = completions('2026-11-23T23:30:00Z');
  assert.equal(getDashboardStats(records, new Date('2026-11-24T12:00:00Z')).streak, 1);
});

test('streak calculations cross month, year, and leap-day boundaries', () => {
  assert.equal(getDashboardStats(completions('2025-12-31T12:00:00Z', '2026-01-01T12:00:00Z'), new Date('2026-01-01T13:00:00Z')).streak, 2);
  assert.equal(getDashboardStats(completions('2024-02-28T12:00:00Z', '2024-02-29T12:00:00Z', '2024-03-01T12:00:00Z'), new Date('2024-03-01T13:00:00Z')).streak, 3);
});

test('daylight-saving changes do not break consecutive calendar days', () => {
  const spring = completions('2026-03-28T11:00:00Z', '2026-03-29T10:00:00Z', '2026-03-30T10:00:00Z');
  assert.equal(getDashboardStats(spring, new Date('2026-03-30T12:00:00Z')).streak, 3);
  const autumn = completions('2026-10-24T10:00:00Z', '2026-10-25T11:00:00Z', '2026-10-26T11:00:00Z');
  assert.equal(getDashboardStats(autumn, new Date('2026-10-26T12:00:00Z')).streak, 3);
});

test('duplicate document IDs and invalid dates do not inflate the dashboard', () => {
  const record = { id: 'same-completion', completedAt: '2026-11-24T10:00:00Z' };
  const records = [record, record, { id: 'invalid', completedAt: 'not-a-date' }, { id: 'pending', completedAt: null }];
  assert.deepEqual(getDashboardStats(records, new Date('2026-11-24T12:00:00Z')), { completedExercises: 1, streak: 1 });
});
