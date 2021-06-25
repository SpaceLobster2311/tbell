/**
 * Pizza delivery prompt example
 * run example by writing `node pizza.js` in your console
 */

'use strict';
// const cors = require(cors);
const axios = require('axios');
const inquirer = require('inquirer');

console.log('Hi, welcome to TacoBell.js');

// login 
const accountStatus = [
  {
    type: 'confirm',
    name: 'accountCreation',
    message: 'Do you have an account?',
  },

];

const login = [
  {
    type: 'input',
    name: 'username',
    message: 'Enter username',
  },
  {
    type: 'input',
    name: 'password',
    message: 'Enter password',
  },
];

const signup = [
  {
    type: 'input',
    name: 'username',
    message: 'Enter username',
  },
  {
    type: 'input',
    name: 'password',
    message: 'Enter password',
  },
];


const questions = [

  {
    type: 'input',
    name: 'name',
    message: 'What\'s your name?',
    validate(value) {
      const pass = value.match(
        /^[a-zA-Z]*$/,
      );
      if (pass) {
        // add value as the username to be sent in the http request
        return true;
      }

      return 'Please use letters only';
    },
  },
  {
    type: 'input',
    name: 'phone',
    message: 'What\'s your 10 digit numerical password?',
    validate(value) {
      const pass = value.match(
        /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
      );
      if (pass) {
        // add value as password to be sent in http request
        return true;
      }
      return 'Please enter a valid password';
    },
  
  },

  {
    type: 'list',
    name: 'size',
    message: 'What type of food do you want?',
    choices: ['Taco', 'Burrito', 'CrunchwrapSupreme'],
    filter(val) {
      return val.toLowerCase();
    },
  },
  {
    type: 'input',
    name: 'quantity',
    message: 'How many do you need?',
    validate(value) {
      const valid = !isNaN(parseFloat(value));
      return valid || 'Please enter a number';
    },
    filter: Number,
  },
  {
    type: 'expand',
    name: 'toppings',
    message: 'What kind of meat??',
    choices: [
      {
        key: 'b',
        name: 'beef and cheese',
        value: 'beef',
      },
      {
        key: 'c',
        name: 'shreddedChicken',
        value: 'shreddedChicken',
      },
      {
        key: 'p',
        name: 'Pork',
        value: 'Pork',
      },
    ],
  },
  {
    type: 'rawlist',
    name: 'beverage',
    message: 'What kind of drank?',
    choices: ['MtnDew', 'bahaBlast', 'bahaFreeze'],
  },
  {
    type: 'input',
    name: 'comments',
    message: 'Anything else?',
    default: 'Nope, I\'m set.',
  },
  {
    type: 'list',
    name: 'prize',
    message: 'Listen you can get fireSauce or sourCream that all I got',
    choices: ['fireSauce', 'sourCream'],
    when(answers) {
      return answers.comments !== 'Nope, all good!';
    },
  },
];


// nesting inquirer stuff

inquirer.prompt(accountStatus).then((answer) => {
  console.log(answer);
  if(answer.accountCreation === true){
    console.log('working');
    inquirer.prompt(login).then((answers) => {
      console.log(JSON.stringify(answers));
      JSON.parse(JSON.stringify(answers));
      let url = 'http://localhost:3000/signin';
      console.log(answers);
      console.log(answers.username.value);
      axios.post(url, {
        data: {
          username: answers.username.value,
          password: answers.password.value,
        },
      }).then((res) =>{
        console.log(res);
        inquirer.prompt(questions).then((answers) => {
          console.log('\nOrder receipt:');
          axios.post('http://localhost:3000/food', answers);
        }).catch((e) => {
          console.log(e);
        });
      }).catch((e) => console.log(e));
      //login
      // enter username and password

      // }else{
      //create account


    // // runs the questions
    // // send post request of the results to user db
    });
  }else{
    console.log('else statement');
    inquirer.prompt(signup).then((answers) => {
      console.log(JSON.stringify(answers));
      axios({
        method: 'post',
        url: 'http://localhost:3000/signup',
        data: answers,
      });
    });
  }
});
