const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [ true, "Title is required"],
        minlength: [3, "Title must be at least 3 characters long"]
    },
    price: {
        type: Number,
        required: [ true, "Price is required"],
        min: [ 1, "Price must be at least $1"]
    },
    quantity: {
        type: Number,
        required: [ true, "Quantity is required"],
        min: [ 1, "Price must be at least 0"]
    },
    description: {
        type: String,
        required: [ true, "Description is required"],
        minlength: [10, "Description must be at least 10 characters long"]
    }
},
{ timestamps: true }
);

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [ true, "email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    userName: {
        type: String,
        required: [true, "Username is required"],
        minlength: [3, "Username can't be less than 3 characters long"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    },
    products: [ProductSchema]
}, { timestamps: true })

UserSchema.virtual('confirmPassword')
.get( () => this._confirmPassword )
.set( value => this._confirmPassword = value );
UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
        this.password = hash;
        next();
    });
});


const Product = mongoose.model("Product", ProductSchema);
const Users = mongoose.model("Users", UserSchema);
module.exports = {Users, Product}