import type { QuoteType } from '../types.js';
import prettier from 'prettier';

export default async function detectPrettierQuoteType(filepath: string): Promise<QuoteType | null> {
  try {
    const config = await prettier.resolveConfig(filepath);

    if (!config) {
      return null;
    }

    if (typeof config.singleQuote === 'boolean') {
      return config.singleQuote ? 'single' : 'double';
    }

    return null;
  } catch (_) {
    return null;
  }
}
