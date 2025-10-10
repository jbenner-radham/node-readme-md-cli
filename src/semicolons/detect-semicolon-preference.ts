import findSourceIndexPath from '../find-source-index-path.js';
import detectEslintSemicolonPreference from './detect-eslint-semicolon-preference.js';
import detectPrettierSemicolonPreference from './detect-prettier-semicolon-preference.js';

export default async function detectSemicolonPreference(): Promise<boolean | null> {
  const filepath = findSourceIndexPath();

  if (!filepath) {
    return null;
  }

  const eslintSemicolonPreference = await detectEslintSemicolonPreference(filepath);

  if (eslintSemicolonPreference !== null) {
    return eslintSemicolonPreference;
  }

  return detectPrettierSemicolonPreference(filepath);
}
