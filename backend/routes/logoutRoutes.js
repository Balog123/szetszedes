const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser')

router.post('/', (req, res) => {
    res.clearCookie('token');
    res.json({ success: true, message: 'Logout successful' });
    console.log('Sikeres kijelentkezés');
});

module.exports = router;