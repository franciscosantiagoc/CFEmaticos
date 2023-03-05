import server from './src/app.js';
//const { conn } = require('./src/db.js');
//const {GetProductsAPI} = require("./src/controllers/Products/GetProductsAPI");

//const {User} = require("./src/db");

server.listen(process.env.PORT || 3001/* 5000 */,  () => {
    const portConection = process.env.PORT | 3001;
    console.log('listening on port ' + portConection);
})
