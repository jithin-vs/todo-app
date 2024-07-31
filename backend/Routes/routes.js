import express from 'express';
import { User, Todo } from '../Schema/mainSchema.js';
import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
import { verifyToken, generateToken } from '../Auth/auth.js';
import  generateTodoId  from '../Functions/functions.js'
const router = express.Router();
configDotenv();

  router.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log("Username:", username);
      console.log("Password:", password);
      const user = await User.findOne({ username });
      if (!user || password !== user.password) {
        return res.status(401).json({ error: "Incorrect username or password" });
      }
      const token = jwt.sign(
        {
          userData: user,
        },
        process.env.SECRET_KEY
      );
      return res.status(200).json({ message: "Login successful", token, userData: user });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
router.post("/register",async (req, res) => {
    try {
        const { name, email, username, password} = req.body;
        const newUser = new User({
            name,
            email,
            username,
            password
        });
        await newUser.save();
        res.status(201).json({ message: "User saved successfully" });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ error: "Username already exists" });
      } else {
        console.error("Error saving user:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  }
);
router.get("/getTodo",verifyToken,async (req, res) => {
  try {
    const user = req.user.userData;
    const username = user.username;
    const allTasks = await Todo.find({ username: username, progress: 'in progress' });
    res.json(allTasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
});

router.post("/addTodo",verifyToken,async (req, res) => {
  try {
    const user = req.user.userData;
    const username = user.username;
    console.log(req.body);
    const { title, description } = req.body;
    const id = generateTodoId();
    const newTodo = new Todo({
      id,
      username,
      title,
      description,
      progress:'in progress'
  });
  const updatedTodo = await newTodo.save();
  res.status(201).json({ data:updatedTodo , message: "Task saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
});
router.put("/completeTodo/:id",verifyToken,async (req, res) => {
  const user = req.user.userData;
  const username = user.username;
  const id = req.params.id;
  try {
    const updated_todo = await Todo.findOneAndUpdate(
      { id: id , username:username },
      { progress:'completed' },
      { new: true }
    ); 
    if (!updated_todo) {
        res.status(401).json({message:"Task Not Found!!"});
    } else {
        res.status(200).json({message:"Task Completed!!",data:updated_todo});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
});
router.delete("/deleteTodo/:id",verifyToken,async (req, res) => {
  try{
    const id = req.params.id;
    const deletedTodo = await Todo.findOneAndDelete( { id: id } );  
    if (!deletedTodo) {
        res.status(200).json({message:"Task Not Found!!"});
    } else {
        res.status(200).json({message:"Task deleted!!",data:deletedTodo});
    }
  }catch(err){
      console.log("error:",err);
      res.status(500).json({message:"Could not delete Task !!:InternalServer Error \n",error:err});
  }
  
});
export default router ;