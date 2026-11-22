export function getAvailableGroups(items, groups) {
  const counts = new Map();
  for (const item of items) {
    counts.set(item.groupId, (counts.get(item.groupId) ?? 0) + 1);
  }
  return groups
    .filter((group) => group.targetLanguage === "es" && counts.has(group.id))
    .map((group) => ({ ...group, itemCount: counts.get(group.id) }));
}

export function getSelectedGroupItems(items, groups, difficulty, selectedGroupIds) {
  // Only groups from the active difficulty and language can enter a session.
  const validIds = new Set(
    groups
      .filter((group) =>
        group.difficulty === difficulty &&
        group.targetLanguage === "es" &&
        selectedGroupIds.includes(group.id),
      )
      .map((group) => group.id),
  );
  return items.filter((item) => validIds.has(item.groupId));
}
