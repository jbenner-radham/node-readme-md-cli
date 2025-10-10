import findSourceIndexPath from '../find-source-index-path.js';
import type { QuoteType } from '../types.js';
import detectEslintQuoteType from './detect-eslint-quote-type.js';
import detectPrettierQuoteType from './detect-prettier-quote-type.js';

export default async function detectQuoteType(): Promise<QuoteType | null> {
  const filepath = findSourceIndexPath();

  if (!filepath) {
    return null;
  }

  const eslintQuoteStyle = await detectEslintQuoteType(filepath);

  if (eslintQuoteStyle) {
    return eslintQuoteStyle;
  }

  return detectPrettierQuoteType(filepath);
}
