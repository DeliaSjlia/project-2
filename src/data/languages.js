export const languages = [
  { code: "es", label: "Spanisch", flag: "🇪🇸", translationInstruction: "Übersetze ins Spanische:" },
  { code: "it", label: "Italienisch", flag: "🇮🇹", translationInstruction: "Übersetze ins Italienische:" },
  { code: "ja", label: "Japanisch", flag: "🇯🇵", translationInstruction: "Übersetze ins Japanische:" },
];

export function getLanguage(code) {
  return languages.find((language) => language.code === code) ?? languages[0];
}
