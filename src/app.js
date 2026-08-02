require('dotenv').config();
require('./config/env');

const express = require('express');
const path = require('path');
const config = require('./config/appConfig');

const pageRoutes = require('./routes/pageRoutes');
const testRoutes = require('./routes/testRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const {errorHandler} = require('./middleware/errorHandler');
const {notFoundHandler} = require('./middleware/notFoundHandler')
const { logger } = require('./middleware/logger');

const app = express();
const port = config.port;


app.use(express.static(path.join(__dirname , '../public')));

app.use(logger);

app.use('/', pageRoutes);
app.use('/test' , testRoutes);
app.use('/', serviceRoutes);


//Error Handlers
app.use(errorHandler);
app.use(notFoundHandler);


app.listen(port , ()=>{
    console.log(`Julie Transporters server is running at http://localhost:${port}`);
})

