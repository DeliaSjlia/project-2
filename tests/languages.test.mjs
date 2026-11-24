import test from 'node:test';
import assert from 'node:assert/strict';
import { languages } from '../src/data/languages.js';
import { mockExerciseContent } from '../src/data/mockExerciseContent.js';
import { mockLearningGroups } from '../src/data/mockLearningGroups.js';
import { checkAnswer, checkExerciseAnswer } from '../src/utils/checkAnswer.js';
import { getAvailableGroups, getSelectedGroupItems } from '../src/utils/learningGroups.js';
import { containsKanji, defaultHiraganaHelp, getMissingWordReading } from '../src/utils/japaneseReading.js';
import { createRound, exerciseRoundReducer, getMistakes } from '../src/utils/exerciseRound.js';

test('each selectable language has linked content for every exercise type and difficulty', () => {
  assert.deepEqual(languages.map(language => language.code).sort(), ['es', 'it', 'ja']);
  const seenIds = new Set();
  for (const { code } of languages) {
    const content = mockExerciseContent[code];
    assert.ok(content);
    assert.ok(content.groups.every(group => group.targetLanguage === code));
    for (const items of [content.vocabulary, content.translations, content.missingWords]) {
      for (const item of items) {
        assert.equal(seenIds.has(item.id), false, `Duplicate ID: ${item.id}`);
        seenIds.add(item.id);
        assert.ok(content.groups.some(group => group.id === item.groupId), item.id);
        if (item.targetLanguage) assert.equal(item.targetLanguage, code);
      }
      for (const group of content.groups) {
        assert.ok(items.some(item => item.groupId === group.id), `Empty group: ${group.id}`);
      }
    }
  }
});

test('group filtering keeps Spanish, Italian and Japanese separate even with mixed data', () => {
  const items = Object.values(mockExerciseContent).flatMap(content => content.translations);
  for (const { code } of languages) {
    const available = getAvailableGroups(items, mockLearningGroups, code);
    assert.ok(available.length > 0);
    assert.ok(available.every(group => group.targetLanguage === code));
    // Deliberately submit IDs from every language and difficulty.
    const selected = getSelectedGroupItems(items, mockLearningGroups, 'beginner', mockLearningGroups.map(group => group.id), code);
    assert.ok(selected.length > 0);
    assert.ok(selected.every(item => available.some(group => group.id === item.groupId && group.difficulty === 'beginner')));
  }
});

test('Japanese native answers and Romaji work at every difficulty without an opt-in', () => {
  const content = mockExerciseContent.ja;
  for (const item of [...content.translations, ...content.missingWords]) {
    assert.ok(item.acceptedRomaji.length > 0, item.id);
    for (const answer of [...item.acceptedAnswers, ...item.acceptedRomaji]) {
      assert.equal(checkExerciseAnswer(answer, item, { ignoreAccents: false }), true, `${item.id}: ${answer}`);
    }
  }
  const water = content.missingWords.find(item => item.id === 'ja-m-003');
  for (const answer of ['水', 'みず', 'mizu', 'ＭＩＺＵ']) {
    assert.equal(checkExerciseAnswer(answer, water), true);
  }
  const coffee = content.missingWords.find(item => item.id === 'ja-m-004');
  assert.equal(checkExerciseAnswer('コーヒー', coffee), true);
  assert.equal(checkExerciseAnswer('koohii', coffee), true);
  assert.equal(checkExerciseAnswer('こーひー', coffee), false);
});

test('Japanese checking ignores punctuation/spacing but preserves meaningful kana differences', () => {
  const item = mockExerciseContent.ja.translations.find(item => item.id === 'ja-t-005');
  assert.equal(checkExerciseAnswer('えき は どこ ですか？', item), true);
  assert.equal(checkExerciseAnswer('EKIWADOKODESUKA', item), true);
  assert.equal(checkAnswer('か', ['が'], { targetLanguage: 'ja' }), false);
  assert.equal(checkAnswer('が', ['か\u3099'], { targetLanguage: 'ja' }), true);
  assert.equal(checkAnswer('きつぷ', ['きっぷ'], { targetLanguage: 'ja' }), false);
  assert.equal(checkAnswer('！？', ['です'], { targetLanguage: 'ja' }), false);
});

test('Italian accent checking is optional and existing Spanish rules still apply', () => {
  assert.equal(checkAnswer('caffe', ['caffè'], { targetLanguage: 'it' }), true);
  assert.equal(checkAnswer('caffe', ['caffè'], { targetLanguage: 'it', ignoreAccents: false }), false);
  assert.equal(checkAnswer('dias', ['días']), true);
  assert.equal(checkAnswer('ano', ['año']), false);
});

test('Hiragana help defaults on only for Beginner and does not control accepted answers', () => {
  assert.equal(defaultHiraganaHelp('beginner'), true);
  assert.equal(defaultHiraganaHelp('medium'), false);
  assert.equal(defaultHiraganaHelp('hard'), false);
  const item = mockExerciseContent.ja.translations.find(item => item.id === 'ja-t-011');
  assert.equal(checkExerciseAnswer(item.acceptedRomaji[0], item, { showHiragana: false }), true);
  assert.equal(checkExerciseAnswer(item.acceptedRomaji[0], item, { showHiragana: true }), true);
  assert.equal(containsKanji('私は水を飲みます。'), true);
  assert.equal(containsKanji('みず'), false);
  assert.equal(containsKanji('コーヒー'), false);
});

test('Kanji solution texts have explicit readings and cloze prompt readings keep their gap', () => {
  const content = mockExerciseContent.ja;
  for (const item of content.vocabulary) {
    if (containsKanji(item.targetText)) {
      assert.ok(item.hiragana, item.id);
      assert.equal(containsKanji(item.hiragana), false);
    }
  }
  for (const item of content.translations) {
    if (containsKanji(item.acceptedAnswers[0])) assert.ok(item.hiragana, item.id);
  }
  for (const item of content.missingWords) {
    const solution = `${item.before}${item.acceptedAnswers[0]}${item.after}`;
    if (containsKanji(solution)) assert.ok(item.hiragana, item.id);
    if (containsKanji(`${item.before}${item.after}`)) {
      const reading = getMissingWordReading(item);
      assert.ok(reading?.includes('＿＿＿'), item.id);
      assert.equal(containsKanji(reading), false);
    }
  }
  const student = content.missingWords.find(item => item.id === 'ja-m-002');
  assert.equal(getMissingWordReading(student), 'わたしは＿＿＿です。');
  assert.equal(getMissingWordReading(student).includes('がくせい'), false);
  assert.equal(getMissingWordReading({ before: '私', after: '。' }), null);
});

test('mistake retries work with Japanese items and Romaji results', () => {
  const items = mockExerciseContent.ja.translations.slice(0, 2);
  let state = createRound(items);
  state = exerciseRoundReducer(state, { type: 'answerAndNext', correct: false, answer: 'wrong' });
  state = exerciseRoundReducer(state, { type: 'answerAndNext', correct: true, answer: items[1].acceptedRomaji[0] });
  assert.deepEqual(getMistakes(state).map(item => item.id), [items[0].id]);
  state = exerciseRoundReducer(state, { type: 'repeatMistakes' });
  assert.equal(state.items.length, 1);
  assert.equal(state.items[0].targetLanguage, 'ja');
  const answer = state.items[0].acceptedRomaji[0];
  state = exerciseRoundReducer(state, { type: 'answerAndNext', correct: checkExerciseAnswer(answer, state.items[0]), answer });
  assert.equal(state.results[0].correct, true);
});
