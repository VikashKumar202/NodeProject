const winston=require('winston');
const express=require('express');
var app = express();

const config=require('config');
const error=require('./middleware/error');

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}
require('./startup/logging')();
require('./startup/db')();
require('./startup/routes')(app);
require('./startup/prod')(app);

app.use(error); // it specically for eroor middleware pipeline

//throw new Error('something fail during start up');
/* const p = Promise.reject(new Error ('Something failed miserably'))
p.then(()=>console.log("Done"))
 */
const port=process.env.PORT || 5000;
const server=app.listen(port,()=>winston.info(`Listening on Port ${port}...`));

module.exports=server;
