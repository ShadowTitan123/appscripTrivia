const mysql = require('mysql')


// const connection = mysql.createPool({
//   host: 'localhost',
//   dateStrings: true,
//   port : '4050',
//   user: 'root',
//   password: '',
//   database: 'appscrip'
// })



//For Heroku Server
const connection = mysql.createPool({
  host: 'us-cdbr-east-04.cleardb.com',
  user: 'b0ed9b1d3ec896',
  password: 'dcbe7dbf',
  database: 'heroku_83dc76e0b0adfb6'
})


module.exports = connection;