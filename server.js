
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const adminCredentials = {
  username: 'admin',
  password: 'admin123', // Note: In a real application, you would use secure password storage
};

let students = [];

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === adminCredentials.username && password === adminCredentials.password) {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.post('/students', (req, res) => {
  const { name, course, grade } = req.body;

  const newStudent = {
    id: students.length + 1,
    name,
    course,
    grade,
  };

  students.push(newStudent);
  res.json(newStudent);
});

app.get('/students', (req, res) => {
  res.json(students);
});

app.delete('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  students = students.filter(student => student.id !== studentId);
  res.json({ success: true, message: 'Student deleted successfully' });
});

// Serve the admin login page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve the student management system page
app.get('/student-management', (req, res) => {
  res.sendFile(path.join(__dirname, 'student-management.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
