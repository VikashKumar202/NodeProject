const {Mobile,validate}=require('../models/mobile');
const express=require('express');
const router=express.Router(); 
const auth=require('../middleware/auth');
const admin=require('../middleware/admin');
const superAdmin=require('../middleware/superAdmin');
const asyncMiddleware=require('../middleware/async');
const validateObjectId=require('../middleware/validateObjectId');

router.get('/',asyncMiddleware(async(req,res)=>{
    const mobile=await Mobile.find();
    //throw new Error('This is uncaught errors');
    // const p = Promise.reject(new Error ('Something fail'))
        //p.then(()=>console.log("Done")) 
    res.send(mobile);
}));

router.get('/:id', validateObjectId, asyncMiddleware( async(req, res)=> {
    
    const id=req.params.id;
    console.log(id);

     let mobile= await Mobile.findById(id);
     if(!mobile) return res.status(404).send("Sorry !!! Mobile is not Found ")

    res.send(mobile)
 }));

 router.post('/',[auth,admin],asyncMiddleware(async (req,res)=>{
    const {error}=validate(req.body);
    if(error) return res.status(400).send(error.details[0].message); 

  let mobile=new Mobile({
   company : req.body.company,
   model : req.body.model,
   screen_size : req.body.screen_size,
   price : req.body.price,
   camera_specifications : req.body.camera_specifications,
   ram : req.body.ram,
   isDiscountAvailable: req.body.isDiscountAvailable,
   imageUrl: req.body.imageUrl
});

   mobile=await mobile.save() ;
       res.send(mobile)
   
})); 

router.delete('/:id',validateObjectId,[auth,superAdmin],asyncMiddleware(async(req, res)=> {
    const mobile =await Mobile.findByIdAndDelete(req.params.id);

    if(!mobile) return res.status(400).send('Can t delete Id is not there');
    res.send(mobile);
     
     
 })); 

 router.put('/:id', validateObjectId,[auth,admin], asyncMiddleware(async(req, res)=> {
    
     
    const {error}=validate(req.body);
    if(error) return res.status(400).send(error.details[0].message); 

  let mobile={};
  mobile.company = req.body.company,
  mobile.model = req.body.model,
  mobile.screen_size = req.body.screen_size,
  mobile.price = req.body.price,
  mobile.camera_specifications = req.body.camera_specifications,
  mobile.ram = req.body.ram,
  mobile.isDiscountAvailable= req.body.isDiscountAvailable,
  mobile. imageUrl= req.body.imageUrl

  
    const data = await Mobile.findByIdAndUpdate(req.params.id,mobile,{new:true}) //new returns updated object
    if(!data) return res.status(404).send("Sorry Can t Update Id is not there..")

res.send(data) 
 })); 

module.exports=router;