var express = require("express");
var request = require("request");

var app = express();
app.listen(3001, () => console.log("Server running on port 3001"));

//Listen for a call and then return the 5 day forecast
app.get("", (req, res, next) => {
	var appid = req.query.appid;
	
	console.log(appid);
	
	request("http://api.openweathermap.org/data/2.5/forecast?q=vancouver&appid=" + appid, function(err, resp, body){
		if(!err && resp.statusCode == 200){
			res.header("Access-Control-Allow-Origin", "*");
			res.json(body);
		}
	});
});