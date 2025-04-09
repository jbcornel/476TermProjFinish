// payment-server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.post('/charge', (req, res) => {
  const { amount, bookingId } = req.body;
  
  console.log('Payment server received charge request:', req.body);

  // Simple check: if amount is > 0, succeed
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'Invalid payment amount' });
  }

  // Mock successful payment
  res.json({
    success: true,
    message: `Payment of $${amount} for booking ${bookingId} succeeded!`
  });
});

// Start server on port 4000
app.listen(4000, () => {
  console.log('Mock payment server listening on port 4000');
});
