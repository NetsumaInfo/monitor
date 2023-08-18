const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var altitudeData = {altitude:0,his:0,adi:0,updateTime:0};
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }))

app.use(function(req, res, next) {
  //res.header("Access-Control-Allow-Origin", "localhost"); // update to match the domain you will make the request from
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    let origin = req.headers.origin;
    console.log(origin);
    res.header("Access-Control-Allow-Origin", req.headers.host.indexOf("localhost") > -1 ? "http://localhost:3000" : origin);
    res.header("Access-Control-Allow-Methods", "GET,POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Credentials', true);
    next();
});
app.post('/altitudes', (req, res) => {
  altitudeData = req.body;
  altitudeData.updateTime = new Date();
  console.log('received : '+JSON.stringify(altitudeData));
  res.send('OK')
});

app.get('/altitudes', (req, res) => {
  console.log('sending : '+JSON.stringify(altitudeData));
  res.send(altitudeData);
});

app.get('/poll', (req, res) => {
  console.log('pooling : '+JSON.stringify(altitudeData));
  const lastUpdateTime = req.query.lastUpdateTime;
  const interval = setInterval(() => {
    if (altitudeData && altitudeData.updateTime !== lastUpdateTime) {
      res.json(altitudeData);
      clearInterval(interval);
    }
  }, 60000);
});

app.listen(3000, () => {
  console.log('Control application listening on port 3000');
});
//Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
