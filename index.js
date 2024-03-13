const mongoose = require('mongoose');
const express = require('express');
const Question = require('./schema.js');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

async function connectToDb() {
    try {
        await mongoose.connect('mongodb+srv://amruta:vieFC9VXxVSgoPzM@cluster0.rgbuaxs.mongodb.net/ExpenseTracker?retryWrites=true&w=majority&appName=Cluster0');
        console.log('DB Connection established');
        const port = process.env.PORT || 8002;
        app.listen(port, function() {
            console.log(`Listening on port ${port}`);
        });
    } catch (error) {
        console.log(error);
        console.log("Couldn't establish connection");
    }
}

connectToDb();

app.post('/add-ori-ques', async function(request, response) {
    try {
        const newUser = await Question.create({
            text: request.body.text,
            difficulty: request.body.difficulty,
            options: request.body.options,
            correctAnswer: request.body.correctAnswer
        });
        response.status(201).json({
            status: 'success',
            message: 'Question created successfully',
            question: newUser
        });
    } catch (error) {
        console.error('Error creating question:', error);
        response.status(500).json({
            status: 'failure',
            message: 'Failed to create question',
            error: error.message
        });
    }
});

app.get('/req-questions', async function(request, response) {
    try {
        const { difficulty } = request.query;
        const questions = await Question.find({ difficulty });
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

app.post('/check-answer', async function(request, response) {
    try {
        const { selectedAnswer, correctAnswer } = request.body;
        const result = selectedAnswer === correctAnswer ? 'Correct' : 'Incorrect';
        response.status(200).json({ result });
    } catch (error) {
        console.error('Error checking answer:', error);
        response.status(500).json({
            status: 'failure',
            message: 'Failed to check answer',
            error: error.message
        });
    }
});
