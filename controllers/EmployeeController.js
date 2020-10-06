const Employee = require('../models/Employee')

//display all the employee
const employeeList = (req,res,next) => {
    Employee.find().then((result)=>{
        res.status(200).json({
            result
        })
    }).catch((error) => {
        res.status(400).json({
            error
        })
    })
}

//display employee by id
const show = (req,res,next) => {
    const id = req.params.id;
    Employee.find().then((result) => {
        if(result === null)
        return res.status(400).json({
            error:'user does not exists'
        })
        res.status(200).json({
            result
        })
    })
}

//save employee details in the database
const store = (req,res,next) => {
    let employee = new Employee({
        name:req.body.name,
        designation:req.body.designation,
        email:req.body.email,
        phone:req.body.phone,
        age:req.body.age
    });
    console.log(req.file.path)
    //avatar uploading
    if(req.file)
    {
        employee.avatar = req.file.path;
    }
    employee.save().then((result) => {
        res.status(200).json({
            message:"employee added successfully",
            result
        })
    }).catch((error)=>{
        res.status(400).json({
            error:error.message
        })
    })
}

//update employee details
const update = (req,res,next) => {
        Employee.findByIdAndUpdate({_id:req.params.id},req.body).then((result) => {
            if(result === null)
            return res.status(400).json({
                error:'user does not exists'
            })   
            Employee.findById(req.params.id).then((result) => {
                res.status(200).json({
                    message:"employee details updated successfully",
                    result
                })
            })
        }).catch((error) => {
            res.status(400).json({
                error:'user does not exists'
            })
        })
}


//delete employee details
const kickout = (req,res,next) => {
     Employee.findById(req.params.id).then((user)=>{
        if(user === null)
        return res.status(400).json({
            error:"Employee does not exists"
        })
        Employee.findByIdAndRemove(req.params.id).then((user) => {
         if(user) 
         res.status(200).json({msg:"Employee deleted successfully"})
       }).catch((error) => {
           res.status(400).json({
               error:error.message
           })
       })
    }).catch((error) => {
        res.status(400).json({
            error:"Employee does not exists"
       })
    })
}

module.exports = {kickout,update,store,show,employeeList};