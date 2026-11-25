import test from 'node:test';
import assert from 'node:assert/strict';
import { getCompletionData } from '../src/utils/exerciseCompletion.js';

const summary = {
  completionId: 'example-session-1',
  completedAt: '2026-11-24T10:00:00.000Z',
  exerciseType: 'translation',
  targetLanguage: 'ja',
  mode: 'all',
  total: 3,
  score: 2,
  results: [{ exerciseId: 'ja-t-001', answer: 'example', correct: true }],
};

test('a completion payload contains only the required summary data', () => {
  assert.deepEqual(getCompletionData(summary), {
    completedAt: summary.completedAt,
    exerciseType: 'translation', targetLanguage: 'ja', mode: 'all', total: 3, score: 2,
  });
  assert.equal('results' in getCompletionData(summary), false);
});

test('all exercise types, languages, and mistake retries can be saved', () => {
  for (const exerciseType of ['vocabulary', 'translation', 'missingWord']) {
    for (const targetLanguage of ['es', 'it', 'ja']) {
      assert.equal(getCompletionData({ ...summary, exerciseType, targetLanguage, mode: 'mistakes' }).mode, 'mistakes');
    }
  }
});

test('empty, unfinished or inconsistent completion summaries are rejected', () => {
  for (const invalid of [
    { completionId: '' }, { completionId: '../other-user' },
    { total: 0 }, { total: -1 }, { total: 1.5 }, { score: -1 }, { score: 4 },
    { exerciseType: 'unknown' }, { targetLanguage: 'unknown' }, { mode: 'unknown' },
    { completedAt: 'invalid' }, { completedAt: null },
  ]) {
    assert.throws(() => getCompletionData({ ...summary, ...invalid }));
  }
});

test('preparing a retry preserves the captured completion time and leaves the input unchanged', () => {
  const original = structuredClone(summary);
  const first = getCompletionData(summary);
  const retry = getCompletionData(summary);
  assert.deepEqual(retry, first);
  assert.equal(retry.completedAt, summary.completedAt);
  assert.deepEqual(summary, original);
});
