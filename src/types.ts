import type { HeroImage } from 'readme-md';
import type { PackageJson } from 'type-fest';

export type QuoteType = 'backtick' | 'double' | 'single';

export type ReadmeMdCliConfig = {
  badges?: {
    config?: {
      githubActions?: {
        branch?: string;
        workflow?: string;
      };
    };
    render?: ('github-actions' | 'license' | 'node.js' | 'npm')[];
    style?: 'flat' | 'flat-square' | 'for-the-badge' | 'plastic' | 'social';
  };
  description?: string;
  heroImage?: HeroImage;
  preferDev?: boolean;
  preferNpm?: boolean;
  preferSemicolons?: boolean;
  quoteType?: 'double' | 'single';
  sectionOverrides?: {
    usage?: string;
  };
  seeAlso?: {
    [title: string]: string;
  };
};

export type AppConfig = ReadmeMdCliConfig & { pkg?: PackageJson };
