import Badge from './Badge.js';

export default class GithubActionsBadge extends Badge {
  constructor({ githubPathname, workflow, branch, style }: {
    githubPathname: string;
    workflow: string;
    branch: string;
    style?: string;
  }) {
    const alt = 'Build Status';
    const image = 'https://img.shields.io/github/actions/workflow/status' +
            `${githubPathname}/${workflow}?branch=${branch}` + (style ? `&style=${style}` : '');
    const link = `https://github.com${githubPathname}/actions/workflows/${workflow}`;

    super({ alt, image, link });
  }
}
