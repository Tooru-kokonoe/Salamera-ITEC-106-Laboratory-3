const express = require('express');
const app = express();
const studentRoutes = require('./routes/studentRoutes');

app.use(express.json()); // Allows your app to read JSON data
app.use('/api/students', studentRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));