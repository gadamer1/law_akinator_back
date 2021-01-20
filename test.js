const express = require('express');
const { spawn } = require('child_process');

const postRouter = require('./routes/post');

const app = express();

app.get('/', (req, res) => {
    res.send('This is get');
});

app.post('/', (req, res) => {
    let dataTosend;
    let dataTosend2;
    const python = spawn('python3', ['test1.py']);
    python.stdout.on('data', (data) => {
        dataTosend = data.toString();
        console.log(dataTosend);
        python.stdin.write("hak");
        python.stdout.on('data', (data2) => {
            dataTosend2 = data2.toString();
            console.log(dataTosend2);
        });
    })
    python.on('close', (code) => {
        console.log(dataTosend);
        res.send(dataTosend);
    })
})

app.use('/post', postRouter);

app.listen(3001, () => {
    console.log("서버 실행 중... 랄까?");
})