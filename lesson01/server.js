const express = require('express');
const app = express();
const PORT = process.env.PORT || 3500;
const path = require('path');

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

app.listen(PORT, ()=> console.log(`server running on port ${PORT}`));