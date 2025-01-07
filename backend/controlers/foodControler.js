import fs from 'fs';
import foodModel from '../models/foodModel.js';
//add food item
const addFood =async (req,res)=>{

        let image_filename= `${req.file.filename}`
        const newFood = new foodModel({ 
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            description: req.body.description,
            image: image_filename 
        })  
        try{
        const food = await newFood.save();
        res.status(200).json(food);
    }catch(error){
        res.status(500).json(error);
}
}


//list Food
const listFood =async (req,res)=>{
    try{
        const food = await foodModel.find();
        res.status(200).json(food);
    }catch(error){
        res.status(500).json(error);
        
    }
}

//remove food
const removeFood =async (req,res)=>{
    try{

        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{});

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"food removed"});
       
    }catch(error){
        console.log(error);
        res.json({success:false,message:"error"});
        
    }
}


export{ addFood ,listFood,removeFood}



