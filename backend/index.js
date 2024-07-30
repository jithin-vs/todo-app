import express from 'express';
import {connectDb} from './Database/db.js';
import Routes from './Routes/routes.js';
import cors from 'cors';

const app = express();
 
const PORT = process.env.PORT;
connectDb();
app.use(express.json());
app.use(cors());
app.use('/',Routes);
app.listen(PORT,() => {
    
    console.log(`Server is running on http://localhost:${PORT}`);
})




