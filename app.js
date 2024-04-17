const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

// Middleware for parsing JSON and urlencoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Simple in-memory storage for submitted form data
let formData = [];

// Route for serving the form
app.get('/contactus', (req, res) => {
    res.send(`
        <form action="/submit" method="post">
            <label for="name">Name:</label><br>
            <input type="text" id="name" name="name"><br>
            <label for="email">Email:</label><br>
            <input type="email" id="email" name="email"><br><br>
            <button type="submit">Submit</button>
        </form>
    `);
});

// Route for handling form submission
app.post('/submit', (req, res) => {
    const { name, email } = req.body;
    formData.push({ name, email });
    res.redirect('/success');
});

// Route for showing success message
app.get('/success', (req, res) => {
    res.send('Form successfully filled!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
