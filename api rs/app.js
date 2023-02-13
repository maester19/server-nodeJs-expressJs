const express = require('express');
const mongoose = require('mongoose');
const app = express();
const stuffRoutes = require("./routes/stuff")
const userRoutes = require('./routes/user')
const msgRoutes = require("./routes/message")
const conversationRoutes = require('./routes/conversation')
const repertoireRoutes = require('./routes/repertoire')
const postRoutes = require('./routes/post')
const path = require("path")

mongoose.connect('mongodb://localhost:27017/test',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use("/api/stuff", stuffRoutes)
app.use("/api/auth", userRoutes)
app.use("/api/message", msgRoutes)
app.use("/api/conversation", conversationRoutes)
app.use("/api/repertoire", repertoireRoutes)
app.use("/api/post", postRoutes)

module.exports = app;