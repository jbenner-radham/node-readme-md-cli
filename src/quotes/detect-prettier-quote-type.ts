import type { QuoteType } from '../types.js';
import prettier from 'prettier';

export default async function detectPrettierQuoteType(filepath: string): Promise<QuoteType | ''> {
  const config = await prettier.resolveConfig(filepath);

  if (!config) {
    return '';
  }

  return config.singleQuote ? 'single' : 'double';
}
