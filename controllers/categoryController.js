const Category = require ('../models/categoryModel')

const categoryCtrl = {

    getCategories : async (req , res) => {
        try {
            const Categories = await Category.find()
            res.json(Categories)
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    createCategory : async (req , res) => {
        try {    
            const {name} = req.body;
                //check if category exists
            const categorie = await Category.findOne({name})
            if(categorie) return res.status(400).json({msg:"This Category already exists"})          
                //create and save new Category
            const newCategory = new Category({
                name 
            })
            await newCategory.save()
            res.json({msg:'Category has been added successfully'})
        
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    deleteCategory : async (req,res) => {
        try {
            await Category.findByIdAndDelete(req.params.id)
            res.json({msg:'Category has been deleted successfully'})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    updateCategory : async (req,res)=> {
        try {
            await Category.findByIdAndUpdate(req.params.id, {...req.body})
            res.json({msg:"category updated "})
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }

}


module.exports = categoryCtrl