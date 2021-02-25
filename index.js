const express = require('express'),
bodyParser = require('body-parser'),
http = require('http'),
https = require('https'),
querystring = require('querystring'),
config = require('./config'),

app = express(); 

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.listen(2999,()=>{
 console.log('Basic Tableau Broker Server is running on port 2999') 
});

app.get('/', function(req, res) {
  res.send('App is running on http://localhost:2999/');
});

app.get('/api/getTicket',async (req,res)=>{
  try {
    var tck=await getTabTicket(config.tabserver,req.query.username);
    res.json(tck)
  } catch (error) {
    res.send(error)
  }
})

function getTabTicket(tableauServer, username, site){
  return new Promise((resolve,reject)=>{
    let url = new URL(tableauServer + '/trusted');
    let body = {
        username: username,
    };
    if (site) {
        body['target_site'] = site;
    }
    let postData = querystring.stringify(body);
    let proto = http;
    if (url.protocol === 'https:') {
        proto = https;
    }
    let req = proto.request({
        method: 'POST',
        hostname: url.hostname,
        port:url.port,
        path: '/trusted',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }, function (response) {
        let ticketData = '';
        response.on('data', function (chunk) {
            ticketData += chunk;
        });
        response.on('end', function () {
            let contents = {ticket: ticketData};
            resolve(contents);
        });
    });
    req.on('error', function (error) {
      reject(error);
      console.log('ERROR: ' + error);
    });
    req.write(postData);
    req.end();
  })  
}