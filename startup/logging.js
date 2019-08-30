const winston=require('winston');

module.exports=function(){

    /* process.on('uncaughtException',(ex)=>{
    console.log('WE GOT AN UNCAUGHT EXCEPTION');
    winston.error(ex.message,ex);
    process.exit(1);
  });

  process.on('unhandledRejection',(ex)=>{
    console.log('WE GOT AN UNHANDLED REJECTION');
    winston.error(ex.message,ex);
    process.exit(1);
  });  */

     winston.handleExceptions(
      //new winston.transports.Console({colorize:true,prettyPrint:true}),
    new winston.transports.File({filename:'uncaughtExceptions.log'}));
 
    process.on('unhandledRejection',(ex)=>{
        throw ex;
    });  

  winston.add(winston.transports.File,{filename:'logfile.log'});
  /* winston.add(winston.transports.MongoDB,{
    db:'mongodb+srv://vikash:espl123@myfirstcluster-bhteb.mongodb.net/authentication?retryWrites=true&w=majority',
    level:'info'
});  */ 
}