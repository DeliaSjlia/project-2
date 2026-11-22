import test from 'node:test';
import assert from 'node:assert/strict';
import { getAvailableGroups, getSelectedGroupItems } from '../src/utils/learningGroups.js';
import { createRound, exerciseRoundReducer as reduce, getMistakes } from '../src/utils/exerciseRound.js';
import { mockLearningGroups as groups } from '../src/data/mockLearningGroups.js';
import { mockVocabulary } from '../src/data/mockVocabulary.js';
import { mockTranslations } from '../src/data/mockTranslations.js';
import { mockFindMissingWordExercise } from '../src/data/mockFindMissingWordExercise.js';

test('every mock item has a unique ID and belongs to a valid group', () => {
  for (const items of [mockVocabulary, mockTranslations, mockFindMissingWordExercise]) {
    assert.equal(new Set(items.map(item => item.id)).size, items.length);
    for (const item of items) {
      assert.ok(groups.some(group => group.id === item.groupId));
      if (item.acceptedAnswers) assert.ok(item.acceptedAnswers.length > 0);
    }
    const available = getAvailableGroups(items, groups);
    assert.equal(available.length, 6);
    for (const difficulty of ['beginner', 'medium', 'hard']) {
      assert.equal(available.filter(group => group.difficulty === difficulty).length, 2);
    }
  }
});

test('selecting a group includes all its items; selecting two includes their union', () => {
  const one = getSelectedGroupItems(mockVocabulary, groups, 'beginner', ['es-beginner-greetings']);
  assert.equal(one.length, 5);
  assert.ok(one.every(item => item.groupId === 'es-beginner-greetings'));
  const both = getSelectedGroupItems(mockVocabulary, groups, 'beginner', ['es-beginner-greetings', 'es-beginner-food']);
  assert.equal(both.length, 7);
  assert.deepEqual(getSelectedGroupItems(mockVocabulary, groups, 'beginner', []), []);
});

test('stale selections cannot mix difficulties, include unknown groups or other languages', () => {
  const selected = getSelectedGroupItems(mockTranslations, groups, 'medium', [
    'es-beginner-food', 'es-medium-travel', 'unknown',
  ]);
  assert.equal(selected.length, 2);
  assert.ok(selected.every(item => item.groupId === 'es-medium-travel'));
  const otherGroup = { id: 'ja-group', difficulty: 'medium', targetLanguage: 'ja' };
  const items = [{ id: 'ja-item', groupId: 'ja-group' }, { id: 'unassigned' }];
  assert.deepEqual(getAvailableGroups(items, [...groups, otherGroup]), []);
  assert.deepEqual(getSelectedGroupItems(items, [...groups, otherGroup], 'medium', ['ja-group']), []);
  assert.deepEqual(getAvailableGroups([], groups), []);
});

test('retrying mistakes and restarting stays inside the selected groups', () => {
  const selected = getSelectedGroupItems(mockTranslations, groups, 'hard', ['es-hard-opinions']);
  let round = createRound(selected);
  round = reduce(round, { type: 'answerAndNext', correct: false });
  round = reduce(round, { type: 'answerAndNext', correct: true });
  assert.equal(round.results[0].groupId, 'es-hard-opinions');
  assert.equal(getMistakes(round).length, 1);
  round = reduce(round, { type: 'repeatMistakes' });
  assert.equal(round.items.length, 1);
  round = reduce(round, { type: 'answerAndNext', correct: true });
  round = reduce(round, { type: 'restart', items: selected });
  assert.deepEqual(round.items, selected);
  assert.equal(round.items.length, 2);
});
