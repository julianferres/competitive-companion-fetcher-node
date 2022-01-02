#!/usr/bin/env node

const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const colors = require('colors');

const port = 10046;
const TEMPLATE_FILE = '/home/julian/CP/templates/problem/main.cpp';

const app = express();
app.use(bodyParser.json());

// listen to port 10046
const server = app.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    console.log('Waiting for problems on port 10046');

    console.log('Press Ctrl+C to exit.');
});

// function to write to file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log(`${fileName} created!`.magenta);
    });
}

// function to copy template file
function copyTemplate(problem_name) {
    fs.copyFile(TEMPLATE_FILE, `${problem_name}.cpp`, (err) => {
        if (err){
            return console.log(err);
        }
        console.log('Template copied!'.yellow);
    });
}

// listen to POST requests to /
app.post('/', (req, res) => {
    const problem_name = req.body.url.split('/').pop();
    const problem_complete_name = req.body.name;

    // log a separator line with ===
    console.log("================".green);


    console.log(`Received POST request for "${problem_complete_name}"`.green);
    console.log("Creating tests for problem...".green);

    req.body.tests.forEach((test, i) => {
        const test_name = `${problem_name}${i}`;

        // write test input to file
        writeToFile(`${test_name}.in`, test.input);
        // write test output to file
        writeToFile(`${test_name}.out`, test.output);

    });
    // copy template
    copyTemplate(problem_name);


    // send a response
    res.sendStatus(200);
});

process.on('SIGINT', () => {
    server.close(() => {
    console.log('\nHappy coding! ⌨'.cyan);
  })
})
