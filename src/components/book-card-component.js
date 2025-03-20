export default class BookCardComponent {

    constructor(book, storageService) {
        this.book = book;
        this.storageService = storageService;
    }

    render() {
        const bookContainer = document.createElement('a');
        bookContainer.href = './detail.html?id=' + this.book.id;
        let html = '';
        if (!!this.book.formats["image/jpeg"]) {
            html = `
            <img src="${this.book.formats["image/jpeg"]}">
            <h3>${this.book.title}</h3>
            `
        } else {
            html = `
            <img src="https://cdn.bakerpublishinggroup.com/covers/listing/missing.png">
            <h3>${this.book.title}</h3>
            `
        }
        bookContainer.innerHTML = html;

        const saveButton = document.createElement('button');
        saveButton.addEventListener('click', (event) => this.saveBook(event));

        const node = document.createTextNode('<3');
        saveButton.appendChild(node);
        bookContainer.appendChild(saveButton);

        /// per fare un checkbox!
        // const saveButton = document.createElement('input');
        // saveButton.type = "checkbox";
        // bookContainer.appendChild(saveButton);

        return bookContainer;
    }

    saveBook(event) {

        event.preventDefault();
        this.storageService.save(this.book);

    }

}