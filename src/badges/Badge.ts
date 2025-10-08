export default class Badge {
    readonly alt: string;

    readonly image: string;

    readonly link: string;

    constructor({ alt, image, link }: { alt: string, image: string, link: string }) {
        this.alt = alt;
        this.image = image;
        this.link = link;
    }
}
