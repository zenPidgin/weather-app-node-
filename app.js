/*
JSON.parse(object) <- unbox
JSON.stringify(object) <- minimize

*/


const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");

});//app get

app.post("/", function(req,res){
  // api call url
    const query= req.body.city
    const appId = "8d5ae8d1e04428d5a0bc7704537746f0"
    const units = "imperial"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+appId+"&units="+units;

    // get response
    https.get(url, function(response){
        response.on("data", function(data){
          //turn into readable object with JSON parse
          const weatherData = JSON.parse(data);
          //console.log(weatherData);
          const temp = weatherData.main.temp;
          //get info from weather array
          // remember you can copy the path
          const description = weatherData.weather[0].description;
          const icon = weatherData.weather[0].icon;
          const iconLink = "<img src='http://openweathermap.org/img/wn/"+icon+"@2x.png' alt='weather icon'/>";
          //res.write adds to res to send
          res.write("<h1>"+query+" weather conditions:</h1>");
          res.write(iconLink + " " + description) ;
          res.write("<h2>" + temp + "&deg;F</h2>");
          res.send();
        });//response

    });//https get
});//app post
















app.listen(3000, function(){
  console.log("Server listening on port 3000");
});
