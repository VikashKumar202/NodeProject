const {User,validate}=require('../models/user');
const express=require('express');
const router=express.Router(); 
const bcrypt=require('bcrypt');
const asyncMiddleware=require('../middleware/async');
const validateObjectId=require('../middleware/validateObjectId');
router.get('/',asyncMiddleware(async(req,res)=>{
    const user=await User.find();
    //throw new Error('jtj')
    res.send(user);

}));

router.get('/:id', validateObjectId, asyncMiddleware(async(req, res)=> {
    const id=req.params.id;
    console.log(id);

     let user= await User.findById(id);
     if(!user) res.status(404).send("Sorry !!! Id is not there")
        res.send(user)
 }));

 router.post('/',asyncMiddleware(async (req,res)=>{

    const {error}=validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);  
    let user=await User.findOne({email:req.body.email});
    if(user) return res.status(400).send('User already registerd');

     user=new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }); 

    const salt=await bcrypt.genSalt(10); // generate random string 
    user.password=await bcrypt.hash(user.password, salt); // generate random string and hash of user password
  
   user=await user.save() ;
       res.send(user)
   
})); 

router.delete('/:id',validateObjectId,asyncMiddleware(async(req, res)=> {
    const user =await User.findByIdAndDelete(req.params.id);

    if(!user) return res.status(400).send('Sorry !!! Can t delete Id is not there');
    res.send(user);
     
 })); 

 


module.exports=router;