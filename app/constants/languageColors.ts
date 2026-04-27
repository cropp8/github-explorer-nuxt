export const languageColors: Record<string, string> = {
  JavaScript: 'bg-yellow-400/40',
  TypeScript: 'bg-blue-500/40',
  Vue: 'bg-emerald-500/40',
  HTML: 'bg-orange-500/40',
  CSS: 'bg-blue-500/40',
  Python: 'bg-blue-400/40',
  Java: 'bg-orange-400/40',
  'C++': 'bg-pink-500/40',
  'C#': 'bg-green-600/40',
  C: 'bg-gray-500/40',
  PHP: 'bg-indigo-400/40',
  Ruby: 'bg-red-500/40',
  Go: 'bg-cyan-500/40',
  Rust: 'bg-orange-600/40',
  Swift: 'bg-orange-500/40',
  Kotlin: 'bg-purple-500/40',
  Dart: 'bg-cyan-400/40',
  Shell: 'bg-green-400/40',
  'Objective-C': 'bg-blue-400/40',
  R: 'bg-blue-600/40',
  Jupyter: 'bg-orange-500/40',
};

export function getLanguageBgColorClass(language: string | null | undefined): string {
  const defaultColor = 'bg-gray-500/40';

  if (!language) {
    return defaultColor;
  }

  return languageColors[language] || defaultColor;
}
