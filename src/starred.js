import StarredPageComponent from "./components/starred-page-component.js";
import StorageService from "./services/storage-service.js";

const sService = new StorageService();

const starredPageC = new StarredPageComponent(sService);

starredPageC.start();