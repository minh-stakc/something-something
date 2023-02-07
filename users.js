const express = require('express');

const {getElementById, createElement, updateElement, getIndexById, createErr} = require('./utilsFunctions');
const morgan = require('morgan');
const bodyParser = require('body-parser')


const users = [
    {
      id: 1,
      name: 'John',
      age: 34,
    },
    {
      id: 2,
      name: 'John Smith',
      age: 36
    },
    {
      id: 3,
      name: 'Bob Smith',
      age: 40,
    },
    {
      id: 43,
      name: "Ly",
      age: 50,
    },
    {
      id: 6,
      name: "Khoi",
      age: 54,
    }
  ]
  
  // module.exports = users;

  const userRouter = express.Router();
  
  userRouter.use(morgan('dev'));

  userRouter.use((req, res, next) => {
    console.log(`${req.method} Request Received`);    
    next();
  })

  userRouter.use("/:id",(req, res, next) => {
    const index = getIndexById(req.params.id, users);
    if(index === -1){
      console.log("Error Response Sent");
      return res.status(404).send('Error 404. User not found');
    }
    req.id = req.params.id;
    req.index = index;
    req.user = users[index];
    next();
  });
  

  userRouter.get('/:id', (req, res) => {
    console.log(req.params.id);
    res.send(getElementById(req.params.id, users));
  })
  
  

  userRouter.get("/", (req, res, next) => {
    res.send(JSON.stringify(users).trim());
  });
  
  userRouter.post("/:id", (req, res, next) => {
    const newUser = createElement("users", req.query);
    if (newUser) {
      users.push(newUser);
      res.status(201).send(newUser);
    } 
    return next(createErr('Bad Request', 400));
  });
  
  userRouter.put("/:id", (req, res) => {
      updateElement(req.id, req.query, users);
      res.send(users[req.index]);
  });
  
  userRouter.delete("/:id", (req, res) => {
    users.splice(req.index, 1);
    res.status(204).send('No content');
  })
  
  userRouter.use((err,req,res,next)=>{
    err.status = err.status || 500;
    res.status(err.status).send(err.message);
  })

  module.exports = userRouter;
  