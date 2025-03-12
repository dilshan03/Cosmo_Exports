
import User from "../Model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function createEmployee(req,res){

    const data = req.body;

    data.password = bcrypt.hashSync(data.password,10);

    const newUser = new User(data);

    newUser.save().then(()=>{
        res.json({
            message : "Employee created successfuly"
        })
    }).catch((error)=> {
        res.status(500).json({
            error : "Employee Not created"
        })
    })
}

export function updateEmployee(req,res){

    const data = req.body;
    const newUser = new User(data);

    newUser.save().then(()=>{
        res.json({
            message : "Employee updated successfuly"
        })
    }).catch((error)=> {
        res.status(500).json({
            error : "Employee Not updated"
        })
    })
}

export function loginEmployee(req,res){

    const data = req.body;

    User.findOne({
        email : data.email
    }).then((user)=>{
        if(user==null){
            res.status(404).json ({
                error : "Employee not found"
            })
        }
        else{
            const isPasswordCorrect = bcrypt.compareSync(data.password,user.password);

            if(isPasswordCorrect){
                const token = jwt.sign({
                    firstName : user.firstName,
                    lastName : user.lastName,
                    role : user.role,
                    employeeType : user.employeeType,
                    salary : user.salary,
                    email : user.email
                },"sparepartkey")

                res.json({
                    message : "Login Sucessfull" ,
                    token : token,
                })

            }
            else{
                res.status(401).json({
                    error : "Login Failed"
                })
            }

        }
    })
}

export function isAdmin(req){

    let admin = false;

    if(req.user ==! null && req.user.role == "admin"){
        admin = true;
    }
    return admin;

}

export function isEmployee(req){

    let employee = false;

    if(req.user !== null && req.user.role !== "admin" && req.user.role !== "User"){

        employee = true;
    }
    return employee;
}