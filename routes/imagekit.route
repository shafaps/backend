// routes/imagekit.route.js
const express = require('express');
const crypto = require('crypto');
const route = express.Router();;

route.get('/auth', (req, res) => {
  console.log('Authentication request received');
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;

  if (!privateKey || !publicKey) {
      return res.status(500).json({ message: 'Missing ImageKit credentials' });
  }

  const token = crypto
      .createHmac('sha1', privateKey)
      .update(publicKey)
      .digest('hex');

  console.log('Token generated:', token);

  res.json({
      token: token,
      publicKey: publicKey
  });
});


module.exports = route;
