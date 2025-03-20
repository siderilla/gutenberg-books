import BookCardComponent from "./book-card-component.js";

export default class StarredPageComponent {

    constructor(storageService) {
        this.storageService = storageService;
    }

    async start() {
        this.starredBooks = await this.storageService.getStarredBookData();
        this.render(this.starredBooks);
    }

    render(starredBooks) {
        const mainContainer = document.querySelector("#main-container");
        mainContainer.innerHTML = '';

        for (const book of starredBooks) {
            const cardComponent = new BookCardComponent(book, this.storageService);
            const card = cardComponent.render();
            mainContainer.appendChild(card);
        }
    }
}