require('dotenv').config();
require('./config/env');

const express = require('express');
const path = require('path');
const config = require('./config/appConfig');
const app = express();


const pageRoutes = require('./routes/pageRoutes');
const testRoutes = require('./routes/testRoutes');
const vehichleRoutes  = require('./routes/vehicleRoutes')
const serviceRoutes = require('./routes/serviceRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const {errorHandler} = require('./middleware/errorHandler');
const {notFoundHandler} = require('./middleware/notFoundHandler')
const { logger } = require('./middleware/logger');

const port = config.port;


app.use(express.static(path.join(__dirname , '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(logger);

app.use('/', pageRoutes);
app.use('/api' , vehichleRoutes);
app.use('/api', serviceRoutes);
app.use('/api', bookingRoutes);
app.use('/api', settingsRoutes);
app.use('/test' , testRoutes);


//Error Handlers
app.use(errorHandler);
app.use(notFoundHandler);


app.listen(port , ()=>{
    console.log(`Julie Transporters server is running at http://localhost:${port}`);
})

