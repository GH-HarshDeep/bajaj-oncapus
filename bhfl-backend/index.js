const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// POST /bfhl
app.post('/bfhl', (req, res) => {
  console.log('Received data:', req.body);
  const { data, file_b64 } = req.body;

  // Validate input data
  if (!Array.isArray(data)) {
    return res.status(400).json({ is_success: false, message: 'Data must be an array.' });
  }

  // Separate numbers and alphabets from input data
  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => isNaN(item));

  // Find the highest lowercase alphabet
  const lowercaseAlphabets = alphabets.filter(a => a === a.toLowerCase());
  const highestLowercaseAlphabet = lowercaseAlphabets.length ? [lowercaseAlphabets.sort().pop()] : [];

  // File validation (dummy logic)
  const file_valid = file_b64 ? true : false; // Dummy check for file validity
  const file_mime_type = 'image/png';         // Assume a sample MIME type
  const file_size_kb = 400;                   // Assume a sample file size

  // Sample response format
  const response = {
    is_success: true,
    user_id: "john_doe_17091999", // Example user_id
    email: "john@xyz.com",
    roll_number: "ABCD123",
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet,
    file_valid,
    file_mime_type,
    file_size_kb,
  };

  res.status(200).json(response);
});

// GET /bfhl
app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
