
const mongoose = require('mongoose')
const express = require('express')
const Question=require('./schema.js')
const bodyParser = require('body-parser')


const app = express()
app.use(bodyParser.json())


async function connectToDb() {
  try{
   await mongoose.connect('mongodb+srv://amruta:vieFC9VXxVSgoPzM@cluster0.rgbuaxs.mongodb.net/ExpenseTracker?retryWrites=true&w=majority&appName=Cluster0')
    console.log('DB Connection established')
    const port=process.env.PORT || 8002 // in cloud service take any port no which is avaliable(process.env.PORT) , in local machine it will take 8002 as port number
    app.listen(port,function(){
        console.log(`Listening on port ${port}` )
    })
  }catch(error){
    console.log(error)
    console.log("Couldn't establish connection")
  }
}

connectToDb()



app.post('/add-ori-ques', async function(request, response) {
    try {
      const newUser = await Question.create({
        text: request.body.text,
        difficulty: request.body.difficulty,
        options: request.body.options,
        correctAnswer: request.body.correctAnswer
      })
      response.status(201).json({
        status: 'success',
        message: 'User created successfully',
        user: newUser
      })
    } catch (error) {
      console.error('Error creating user:', error)
      response.status(500).json({
        status: 'failure',
        message: 'Failed to create user',
        error: error.message
      })
    }
  })

app.get('/req-questions', async function(request, response) {
    try {
      const { difficulty } = request.query;
      // Assuming you have a schema named 'Question' for storing questions
      const questions = await Question.find({ difficulty }); // Find questions based on difficulty
      response.status(200).json(questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
      response.status(500).json({
        status: 'failure',
        message: 'Failed to fetch questions',
        error: error.message
      });
    }
  });
  