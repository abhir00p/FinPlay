import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import kpiRouter from './routes/kpi.js'; //NEED TO SPECIFY .JS EXTENSION IN NODEJS
import KPI from './models/KPI.js'; 
import { kpis } from './data/data.js';

/*Config*/
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/*Routes*/
app.use('/kpi', kpiRouter);


/*Mongoose Setup*/
const PORT = process.env.PORT || 9000; //This setups the port to be used by the server
mongoose
    .connect(process.env.MONGO_URL)
    .then(async () => {
        app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });

        /*ADD DATA ONE TIME ONLY OR AS NEEDED*/
        // await mongoose.connection.db.dropCollection(); //Dropping current database DONT DO THIS IN PRODUCTION
        // KPI.insertMany(kpis); 
    })
    .catch((error) => console.log(`${error} did not connect`));