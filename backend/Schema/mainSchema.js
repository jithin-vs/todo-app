import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username :{type:String ,unique:true},
    password: { type: String },
    name: { type: String },
    email:{type:String},
});

const todoSchema = new Schema({
    username: { type: String },
    title: { type: String },
    description: { type: String },
    progress:{ type: String},
  
});
 
const User = mongoose.model('User', userSchema);
const Todo = mongoose.model("Todo", todoSchema);

export { User };