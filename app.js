const express = require('express');
const mongoose = require('mongoose');
const app = express();
const studentRoutes = require("./routes/student")
const teacherRoutes = require("./routes/teacher")
const courseRoutes = require("./routes/course")
const facultyRoutes = require("./routes/faculty")

mongoose.connect('mongodb://localhost:27017/db_test',
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

app.use("/student", studentRoutes)
app.use("/teacher", teacherRoutes)
app.use("/course", courseRoutes)
app.use("/faculty", facultyRoutes)

module.exports = app;