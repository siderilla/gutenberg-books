export default class DetailPageComponent {

    constructor(bookService) {
        this.bookService = bookService;
    }

    async start() {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');

        const book = await this.bookService.getBookById(id);

        this.render(book);
    }

    render(book) {
        document.getElementById('main-container').innerHTML = `<h1>${book.title}</h1>`
    }
}