import { ESLint } from 'eslint';

export default async function detectEslintSemicolonPreference(
  filepath: string
): Promise<boolean | null> {
  try {
    const eslint = new ESLint();
    const config = await eslint.calculateConfigForFile(filepath);

    if (
      Array.isArray(config.rules?.['@stylistic/semi']) &&
      config.rules['@stylistic/semi'].length >= 2
    ) {
      return config.rules['@stylistic/semi'].at(1);
    }

    return null;
  } catch (_) {
    return null;
  }
}
