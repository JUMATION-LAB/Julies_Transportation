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
const testimonialRoutes = require('./routes/testimonialRoutes');
const authRoutes = require('./routes/authRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const uploadRoutes = require('./routes/uploadRoutes')

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
app.use('/api', testimonialRoutes);
app.use('/api', galleryRoutes);
app.use('/api', authRoutes);
app.use('/test' , testRoutes);
app.use('/api', uploadRoutes);



//Error Handlers
app.use(errorHandler);
app.use(notFoundHandler);


app.listen(port , ()=>{
    console.log(`Julie Transporters server is running at http://localhost:${port}`);
})

