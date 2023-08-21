// Client monitor application that send to the Daemon server (service) the new data to update
// the server will be Restfull for 3 reasons:
// 1 - Http protocol is fully integrated with React, NodeJS (and can be used by all other languages)
// 2 - very low code to be done
// 3 - we can configure SSL by using https

const axios = require('axios');//client http
const assert = require('assert');//validation
const prompt = require('prompt-sync')();//input 


const serverHost="127.0.0.1";// localhost
const port=3000;

// Get the three values from the user
const altitude = prompt('Altitude (0-3000): ');//parseInt ?
assert(altitude >= 0 && altitude <= 3000, "invalid altitude .");

const his = prompt('HIS (0-360): ');
assert(his >= 0 && his <= 360, "invalid his .");

const adi = prompt('ADI (-100-100): ');
assert(adi >= -100 && adi <= 100, "invalid adi.");

// Create a structure for the monitor data
const altitudeData = {
  altitude,
  his,
  adi,
};

// Display the structure in JSON
console.log("sending:");
console.log(JSON.stringify(altitudeData));

// Post the structure to the altitude REST service
axios.post(`http://${serverHost}:${port}/altitudes`, altitudeData)
  .then(response => {
    console.log('Altitude data posted successfully.');
    axios.get(`http://${serverHost}:${port}/altitudes`).then(response => {
        console.log('get data :');
        console.log(JSON.stringify(response.data));
    })
    .catch(error => {
       console.log('Error posting altitude data:', error);
     });
  })
  .catch(error => {
    console.log('Error posting altitude data:', error);
  });
