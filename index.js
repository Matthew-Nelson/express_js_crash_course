const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members');

// initializing an express isntance on our 'app' const
const app = express();

// init middleware
// app.use(logger);

// Handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// body parser middleware
    // this will allow the app to handle raw json
app.use(express.json());
    // this will handle form submissions
app.use(express.urlencoded({ extended: false }));


app.get('/', (req,res) => {
    res.render('index', {
        title: 'Member App',
        members
    })
});


// Set static folder (usually will be our public folder)
//          static folder       current dir 
app.use(express.static(path.join(__dirname, 'public')));

// members api routes
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5000;

// starting our server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});