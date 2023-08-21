//server http that use express
// monitor

const express = require('express'); // server http
const bodyParser = require('body-parser');
const app = express();
var altitudeData = {altitude:0,his:0,adi:0,updateTime:0};
app.use(bodyParser.json()); // configure (use) server to send and receive in JSON format.

//configure cors
app.use((req, res, next) => {
    let origin = req.headers.origin;
    console.log(origin);
    const isLocal = req.headers.host.indexOf("localhost") > -1 || req.headers.host.indexOf("127.0.0.1") > -1;
    res.header("Access-Control-Allow-Origin",  isLocal? origin : "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET,POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

// update monitor data
app.post('/altitudes', (req, res) => {
  altitudeData = req.body;
  altitudeData.updateTime = new Date();
  console.log('received : '+JSON.stringify(altitudeData));
  res.send('OK')
});

// get monitor data
app.get('/altitudes', (req, res) => {
  console.log('sending : '+JSON.stringify(altitudeData));
  res.send(altitudeData);
});

// long pooling
// reduce request count
app.get('/poll', (req, res) => {
  console.log('pooling : '+JSON.stringify(altitudeData));
  const lastUpdateTime = req.query.lastUpdateTime;
  const interval = setInterval(() => {
    if (altitudeData && altitudeData.updateTime !== lastUpdateTime) {
      console.log('detected modification : '+JSON.stringify(altitudeData));
      res.json(altitudeData);
      clearInterval(interval);
    }
  }, 1000);
});

app.listen(3000, () => {
  console.log('Control application listening on port 3000');
});
//Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
