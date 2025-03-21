export default class BookService {

    static BASE_URL = 'https://gutendex.com/books/';
    static LIMIT_PAGE = 32;
    static MAX_BOOKS = 75477;
    static MAX_PAGE = Math.ceil(BookService.MAX_BOOKS / BookService.LIMIT_PAGE);

    constructor(page = 1) {
        this.page = page;
        
    }

    async getData() {
        const url = BookService.BASE_URL + '?page=' + this.page;

        const response = await fetch(url);
        const data = await response.json();
        const results = data.results;

        return results;
    }

    async getDataSearch(title, topic) {
        const url = BookService.BASE_URL + '?search=' + title + '&topic=' + topic;
        
        const response = await fetch(url);
        const data = await response.json();
        const results = data.results;

        return results;
    }

    async nextPage() {
        if(this.page < BookService.MAX_PAGE) {
            this.page++;
        } else {
            this.page = 1;
        }
        console.log(this.page);
    }

    prevPage() {
        if(this.page > 1) {
            this.page--;
        } else {
            this.page = BookService.MAX_PAGE;
        }
        console.log(this.page);
    }

    async getBookById(id) {

        const url = BookService.BASE_URL + id;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

}