export default class GithubActionsBadge {
    constructor({ githubPathname = '', workflow = '', branch = '', style = '' }) {
        this.alt = 'Build Status';
        this.image = 'https://img.shields.io/github/actions/workflow/status' +
            `${githubPathname}/${workflow}?branch=${branch}` + (style ? `&style=${style}` : '');
        this.link = `https://github.com${githubPathname}/actions/workflows/${workflow}`;
    }
}
