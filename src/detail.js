import BookService from "./services/books-service.js";
import DetailPageComponent from "./components/detail-page-component.js";

const bService = new BookService();

const detailPageC = new DetailPageComponent(bService);

detailPageC.start();