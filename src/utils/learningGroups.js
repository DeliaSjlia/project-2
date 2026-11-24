export function getAvailableGroups(items, groups, targetLanguage = "es") {
  const counts = new Map();
  for (const item of items) {
    counts.set(item.groupId, (counts.get(item.groupId) ?? 0) + 1);
  }
  return groups
    .filter((group) => group.targetLanguage === targetLanguage && counts.has(group.id))
    .map((group) => ({ ...group, itemCount: counts.get(group.id) }));
}

export function getSelectedGroupItems(items, groups, difficulty, selectedGroupIds, targetLanguage = "es") {
  // Only groups from the active difficulty and language can enter a session.
  const validIds = new Set(
    groups
      .filter((group) =>
        group.difficulty === difficulty &&
        group.targetLanguage === targetLanguage &&
        selectedGroupIds.includes(group.id),
      )
      .map((group) => group.id),
  );
  return items.filter((item) => validIds.has(item.groupId));
}
