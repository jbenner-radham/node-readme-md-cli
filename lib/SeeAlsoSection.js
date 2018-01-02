module.exports = class SeeAlsoSection {
    constructor(seeAlso) {
        const linkNames = Object.keys(seeAlso);
        const links = linkNames.map(linkName => {
            const linkTarget = seeAlso[linkName];

            return `- [${linkName}](${linkTarget})`;
        });

        this.position = -1;
        this.title = 'See Also';
        this.body = links.join('\n');
    }
};
