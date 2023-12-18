const express = require('express');
const app = express();
const PORT = process.env.PORT || 3500;
const { logger } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler') //custom middleware
const cookieParser = require('cookie-parser') //third party middleware
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions')

app.use(logger);
app.use(cors(corsOptions)) // allows requests from other sources to come in like google
                // corsOptions was an object that set what we allow in and what we respond with if not.
// allows json to come in:
app.use(express.json())

app.use(cookieParser())


app.use('/', express.static(path.join(__dirname, '/public'))); //where to find static files like css or pictures.

app.use('/', require('./routes/root'));

// always after all routes. Asterisk means all, anything can reach it.
app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})
app.use(errorHandler);

app.listen(PORT, ()=> console.log(`server running on port ${PORT}`));