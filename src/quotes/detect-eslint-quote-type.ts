import type { QuoteType } from '../types.js';
import { ESLint } from 'eslint';

export default async function detectEslintQuoteType(filepath: string): Promise<QuoteType | ''> {
  try {
    const eslint = new ESLint();
    const config = await eslint.calculateConfigForFile(filepath);

    if (
      Array.isArray(config.rules?.['@stylistic/quotes']) &&
      config.rules['@stylistic/quotes'].length >= 2
    ) {
      return config.rules['@stylistic/quotes'].at(1) satisfies QuoteType;
    }

    return '';
  } catch (_) {
    return '';
  }
}
