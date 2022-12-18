export default class GithubActionsBadge {
    constructor({ githubPathname = '', workflow = '', branch = '', style = '' }) {
        this.alt = 'CI Status';
        this.image = 'https://img.shields.io/github/actions/workflow/status' +
            `${githubPathname}/${workflow}?branch=${branch}`;
        this.link = `https://github.com${githubPathname}/actions/workflows/${workflow}`;
        this.style = style;
    }
}
