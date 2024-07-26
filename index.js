// index.js
const express = require('express');
const app = express();
const db = require('./firebase');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

app.use(express.json());


const authenticateToken = require('./middleware/auth');
const { getClassSchedules, postClassSchedule } = require('./controllers/schedulecontroller');
const { getGrades, postGrade } = require('./controllers/gradecontroller');
const { getForums, postForum } = require('./controllers/forumcontroller');

const { register, login } = require('./controllers/authcontroller');

app.post('/register', register);
app.post('/login', login);

app.get('/schedules', authenticateToken, getClassSchedules);
app.post('/schedules', authenticateToken, postClassSchedule);

app.get('/grades', authenticateToken, getGrades);
app.post('/grades', authenticateToken, postGrade);

app.get('/forums', authenticateToken, getForums);
app.post('/forums', authenticateToken, postForum);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
