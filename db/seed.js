const General = require('./general')
const Intro = require('./intro')
const Technical = require('./technical')


const seeder = function(table, data) {
  let promises = []
  data.forEach(question => {
    table.create(question)
      .then(promise => promises.push(promise))
  })
  Promise.all(promises)
}

/* Introductory Questions */

const introQ =
[ {text: "Tell me a little about yourself."},
  {text: "How did you become interested in this field?"},
  {text: "How did you become interested in this job?"},
  {text: "What questions do you have for me?"},
  {text: "What motivates you?"},
  {text: "What do you like to do outside of work?"} ]

/* General Questions */

const genQ =
[ {text: "Give me an example of a time you had to take a creative and unusual approach to solve coding problem. How did this idea come to your mind? Why do you think it was unusual?"},
  {text: "Tell me about a previous team project and your role in it."},
  {text: "What are your biggest weaknesses?"},
  {text: "Describe a situation in which you met a major obstacle in order to complete a project. How did you deal with it? What steps did you take?"},
  {text: "Where do you see yourself in five years?"},
  {text: "Out of all the other candidates, why should we hire you?"},
  {text: "What do you consider to be your biggest professional achievement?"},
  {text: "Describe a situation in which you felt you had not communicated well enough. What did you do? How did you handle it?"},
  {text: "Describe a team experience you found disappointing. What would you have done to prevent this?"},
  {text: "Why do you want to leave your current job?"},
  {text: "How do you handle conflict in a group?"} ]

/* Technical Questions */

const techQ =
[ {text: "Write a simple function (less than 80 characters) that returns a boolean indicating whether or not a string is a palindrome."},
  {text: "What is a closure?"},
  {text: "What is the significance of, and reason for, wrapping the entire content of a JavaScript source file in a function block?"},
  {text: "Discuss possible ways to write a function isInteger(x) that determines if x is an integer."},
  {text: "Explain the difference between classical inheritance and prototypal inheritance."},
  {text: "Explain the differences between one-way data flow and two-way data binding."} ]


General.sync()
  .then(function(){
    seeder(General, genQ)
  })

Intro.sync()
  .then(function(){
    seeder(Intro, introQ)
  })

Technical.sync()
  .then(function(){
    seeder(Technical, techQ)
  })


