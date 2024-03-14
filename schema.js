const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  // topic:{
  //   type:String,
  //   required:true
  // },
  text: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true
  },
  correctAnswer: {
    type: String,
    required: true
  }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
