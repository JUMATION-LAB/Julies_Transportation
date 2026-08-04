const path = require('path');

const pageService = require('../services/pageService');

// Instead of the route deciding which HTML file to send, 
// we move that responsibility into a controller.
exports.home = (req , res) =>{
    // const page = pageService.getHomePge();
    res.sendFile(path.join(__dirname , '../../admin/admin-login.html'))
};






