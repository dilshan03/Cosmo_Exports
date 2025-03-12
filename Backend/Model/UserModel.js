import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true // Ensures no duplicate usernames
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures no duplicate emails
    },

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 18, // Ensures the employee is at least 18 years old
        max: 65  // Sets an upper limit for age
    },
    
    phone: {
        type: String,
        required: true
    },
    
    role: {
        type: String,
        required: true,
        default: "User"
    },
    employeeType: {
        type: String,
        required: true,
        default : "Temporary"
    },
    salary: {
        type: Number,
        required: true,
        min: 0 // Ensures salary is not negative
    },
    
    status: {
        type: String,
        required: true,
        default: "Available"
    }
});

const User = mongoose.model("employees", userSchema);

export default User;
