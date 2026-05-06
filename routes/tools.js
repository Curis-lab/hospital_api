import Controller from "./controller.js";
import { uploadCSV } from "../controllers/upload-csv-controller.js";
import multerMiddleware from "../middlewares/multer-upload.js";

export default class ToolsRoute extends Controller{
    constructor(){
        super();
        this.post('/csv',uploadCSV, multerMiddleware.fileUpload);
    }
};
