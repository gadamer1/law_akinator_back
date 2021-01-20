const express = require('express');
const spawn = require('child_process').spawn;

const router = express.Router();
router.post('/', (req, res) => {
    let dataTosend;
    const python = spawn('python3', ['test.py']);
    python.stdout.on('data', (data) => {
        dataTosend = data.toString();
    })
    python.on('close', (code) => {
        console.log(dataTosend);
        res.send(dataTosend);
    })
});

module.exports = router;