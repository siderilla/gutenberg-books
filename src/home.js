import BookService from "./services/books-service.js";
import HomePageComponent from "./components/home-page-component.js";
import StorageService from "./services/storage-service.js";

function searchBooks(event) {
    event.preventDefault();

    const form = event.target;
    const data = new FormData(form);
}

const bService = new BookService();
const sService = new StorageService();

const homePageC = new HomePageComponent(bService, sService);

homePageC.start();