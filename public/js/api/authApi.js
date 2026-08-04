const {API} = require('../api/api');
const api = API();

const data = api.get('/services').then(  data =>data  );

// const data = API.request('/services' );
// const data = API();


console.log("data daily bundle  " , data);
