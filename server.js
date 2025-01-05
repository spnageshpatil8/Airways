const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL Connection
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root', // Replace with your MySQL username
  password: 'sujith_18@', // Replace with your MySQL password
  database: 'airline_reservationn', // Replace with your database name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Booking Endpoint
app.post('/api/book-flight', (req, res) => {
  const { name, email, phone, from, to, date, passengers } = req.body;

  if (!name || !email || !phone || !from || !to || !date || !passengers) {
    res.status(400).json({ message: 'All fields are required' });
    return;
  }

  const query = `
    INSERT INTO passengers (name, email, phone, from_location, to_location, travel_date, passengers_count) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [name, email, phone, from, to, date, passengers];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Database error:', err);
      res.status(500).json({ message: 'Error booking flight' });
      return;
    }
    res.status(200).json({ message: 'Booking successful' });
  });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
