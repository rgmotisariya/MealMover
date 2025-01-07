import express from 'express'
import { addFood,listFood ,removeFood} from '../controlers/foodControler.js';
import upload from '../middleware/multer.midelware.js';

const   foodRouter = express.Router();

foodRouter.post('/add', upload.single('image'),addFood); 

foodRouter.get('/list',  listFood); 

foodRouter.post('/delete',  removeFood);


export default foodRouter 