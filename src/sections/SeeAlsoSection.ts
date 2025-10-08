import type { Section } from 'readme-md';

export default class SeeAlsoSection implements Section {
    readonly body: string;

    readonly position: number;

    readonly title: string;

    constructor(seeAlso: Record<string, string>) {
        // const linkNames = Object.keys(seeAlso);
        // const links = linkNames.map(linkName => {
        //     const linkTarget = seeAlso[linkName];
        //
        //     return `- [${linkName}](${linkTarget})`;
        // });
        const links = Object.entries(seeAlso)
            .map(([text, href]) => `- [${text}](${href})`);

        this.body = links.join('\n');
        this.position = -1;
        this.title = 'See Also';
    }
}
