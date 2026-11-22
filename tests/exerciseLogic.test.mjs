import test from 'node:test';
import assert from 'node:assert/strict';
import { checkAnswer } from '../src/utils/checkAnswer.js';
import { createRound, exerciseRoundReducer as reduce, getMistakes } from '../src/utils/exerciseRound.js';

const items = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];

test('normalizes case, spacing, punctuation and optional accents', () => {
  assert.equal(checkAnswer('  BUENOS   dias! ', ['Buenos días']), true);
  assert.equal(checkAnswer('¿Cómo estás?', ['cómo estás']), true);
  assert.equal(checkAnswer('dias', ['días'], { ignoreAccents: false }), false);
  assert.equal(checkAnswer('di\u0301as', ['días'], { ignoreAccents: false }), true);
  assert.equal(checkAnswer('pinguino', ['pingüino']), true);
  assert.equal(checkAnswer('ano', ['año']), false);
  assert.equal(checkAnswer('???', ['???']), false);
  assert.equal(checkAnswer('  ', ['hola']), false);
  assert.equal(checkAnswer('hola', []), false);
  assert.equal(checkAnswer('yo quiero agua', ['Quiero agua', 'Yo quiero agua']), true);
});

test('written question needs an answer before next and records each item once', () => {
  let state = createRound(items);
  assert.equal(reduce(state, { type: 'next' }), state);
  state = reduce(state, { type: 'answer', correct: false, answer: 'wrong', checking: { ignoreAccents: true } });
  assert.equal(state.currentIndex, 0);
  assert.equal(state.results.length, 1);
  assert.equal(reduce(state, { type: 'answer', correct: true }), state);
  state = reduce(state, { type: 'next' });
  assert.equal(state.currentIndex, 1);
  assert.equal(reduce(state, { type: 'next' }), state);
  assert.deepEqual(state.results[0].checking, { ignoreAccents: true });
});

test('mistake rounds shrink, score resets, and restart restores every original item', () => {
  let state = createRound(items);
  for (const correct of [false, true, false]) state = reduce(state, { type: 'answerAndNext', correct });
  assert.equal(state.currentIndex, 3);
  assert.equal(state.results.filter(r => r.correct).length, 1);
  assert.deepEqual(getMistakes(state).map(x => x.id), ['a', 'c']);
  state = reduce(state, { type: 'repeatMistakes' });
  assert.equal(state.roundNumber, 2);
  assert.equal(state.mode, 'mistakes');
  assert.equal(state.results.length, 0);
  assert.deepEqual(state.items.map(x => x.id), ['a', 'c']);
  for (const correct of [true, false]) state = reduce(state, { type: 'answerAndNext', correct });
  state = reduce(state, { type: 'repeatMistakes' });
  assert.deepEqual(state.items.map(x => x.id), ['c']);
  state = reduce(state, { type: 'answerAndNext', correct: true });
  assert.deepEqual(getMistakes(state), []);
  assert.equal(reduce(state, { type: 'repeatMistakes' }), state);
  assert.equal(reduce(state, { type: 'answerAndNext', correct: false }), state);
  state = reduce(state, { type: 'restart', items });
  assert.deepEqual(state.items, items);
  assert.equal(state.currentIndex, 0);
  assert.equal(state.mode, 'all');
  assert.equal(state.results.length, 0);
});

test('empty rounds are safe and incomplete rounds cannot repeat mistakes', () => {
  const empty = createRound([]);
  assert.equal(reduce(empty, { type: 'next' }), empty);
  assert.equal(reduce(empty, { type: 'answer', correct: true }), empty);
  assert.equal(reduce(empty, { type: 'repeatMistakes' }), empty);
  const partial = reduce(createRound(items), { type: 'answerAndNext', correct: false });
  assert.equal(reduce(partial, { type: 'repeatMistakes' }), partial);
});

