import type { Section } from 'readme-md';

export default class SeeAlsoSection implements Section {
  readonly body: string;

  readonly position: number;

  readonly title: string;

  constructor(seeAlso: Record<string, string>) {
    const links = Object.entries(seeAlso)
      .map(([text, href]) => `- [${text}](${href})`);

    this.body = links.join('\n');
    this.position = -1;
    this.title = 'See Also';
  }
}
