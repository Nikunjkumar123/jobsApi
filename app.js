const bodyParser = require('body-parser');
const express = require('express');
const app = express();
require('dotenv').config();
require('express-async-errors');

const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const jobroutes = require('./routes/jobs.js')
const authroutes = require('./routes/auth.js')
const connectdb = require('./db/connect.js')
const notfoundMiddleware = require('./middleware/not-found.js');
const errorHandlerMiddleware =require('./middleware/error-handler.js')

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());


const PORT = process.env.PORT;
connectdb(process.env.URL);
const authenticateUser= require('./middleware/authentication.js')
app.use('/api/v1/jobs',authenticateUser,jobroutes); 
app.use('/api/v1/auth',authroutes); 

app.use(notfoundMiddleware)
app.use(errorHandlerMiddleware)



app.listen(PORT,()=>{
    console.log("connected to",PORT);
})