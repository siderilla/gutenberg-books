import BookService from "./services/books-service.js";
import HomePageComponent from "./components/home-page-component.js";
import StorageService from "./services/storage-service.js";

const bService = new BookService();
const sService = new StorageService();

const homePageC = new HomePageComponent(bService, sService);

homePageC.start();