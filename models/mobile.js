const mongoose=require('mongoose');
const Joi=require('joi');

const Mobile=mongoose.model('Mobile',new mongoose.Schema({
    company:{
        type:String,
        required:true,
        trim:true
    },
    model:{
        type:String,
        required:true,
        trim:true
    },
    screen_size:{
        type:Number,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true,
        trim:true
    },
    camera_specifications:{
        type:String,
        required:true,
        trim:true
    },
    ram:{
        type:Number,
        required:true,
        trim:true
    },
    isDiscountAvailable:{
        type:Boolean,
        required:true,
    },
    imageUrl:{
        type:String,
        required:true,
        minlength:5,
        maxlength:1200
    }
}));



function validateMobile(mobileSchema){
    const schema={
        company:Joi.string().min(3).max(50).required(),
        model:Joi.string().min(3).max(25).required(),
        screen_size:Joi.number().required(),
        price:Joi.number().required(),
        camera_specifications:Joi.string().min(3).max(50).required(),
        ram:Joi.number().min(3).max(50).required(),
        isDiscountAvailable:Joi.boolean().required(),
        imageUrl:Joi.string().uri().min(10).max(500).required(),
        

    };
    
    return Joi.validate(mobileSchema,schema);
    
}

exports.Mobile=Mobile;
exports.validate=validateMobile;