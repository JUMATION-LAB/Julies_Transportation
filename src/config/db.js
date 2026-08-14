const { Pool } = require('pg');
const config = require('../config/appConfig');

const pool = new Pool({
    host: config.db.host,
    port: config.db.port,
    database: config.db.name,
    user: config.db.user,
    password: config.db.password,
    max:20,
    idleTimeoutMillis: 30000, //30s
    connectionTimeoutMillis: 2000 //Returns an error if connection takes over 2s
})

pool.on('connect', ()=>{
    console.log('Database connected successfully.')
});

pool.on('error', (err)=>{
    console.error(err);
    console.log('Database failed to connect.')
});

console.log('in.');





