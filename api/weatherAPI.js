var express = require("express");
var request = require("request");

var app = express();
app.listen(3001, () => console.log("Server running on port 3001"));

/*Converts a temperature in Kelvin
to one in Celcius to the nearest degree*/
function KtoC(kelvin){
	return Math.round(kelvin - 273.15);
}

/*Given a date object, returns it's corresponding
day written in english (ex. Monday)*/
function dateToDay(date){
	const day = date.getDay();
	
	switch(day){
		case 0:
		return "Sunday";
		break;
		
		case 1:
		return "Monday";
		break;
		
		case 2:
		return "Tuesday";
		break;
		
		case 3:
		return "Wednesday";
		break;
		
		case 4:
		return "Thursday";
		break;
		
		case 5:
		return "Friday";
		break;
		
		case 6:
		return "Saturday";
		break;
		
		default:
		return "DATE ERROR";
		break;
	}
	
}

/*Given the raw weather data for a specific
time, extracts the temp,
day of the week and the main weather event.*/
function extractCritical(weatherDay){
	const temp = KtoC(weatherDay.main.temp);
	const day = dateToDay(new Date(weatherDay.dt_txt));
	const main = weatherDay.weather[0].main;
	
	return {"temp": temp, "day": day, "weather": main};
}

/*Given the raw 5 day forecast JSON from
Open Weather Map returns a filtered array
where the first index is the current weather,
and the next are the weather for the following four
days at 12:00.*/
function filterData(body){
	body = JSON.parse(body);
	var weatherArray = [];
	const unfiltered = body.list;
	
	//Make the first entry
	weatherArray.push(extractCritical(unfiltered[0]));
	const firstDay = new Date(unfiltered[0].dt_txt);
	
	//Now look for the other days at 12:00
	for(var i=1; i<unfiltered.length; i++){
		const cur = unfiltered[i];
		const date = new Date(cur.dt_txt);
		
		//Check that the time is right and we're not getting a duplicate
		if(date.getHours() === 12 && !(date.getDay() === firstDay.getDay())){
			console.log(date.getDay());
			console.log(firstDay.getDay());
			weatherArray.push(extractCritical(cur));
		}
	}
	
	return JSON.stringify(weatherArray);
	
}

//Listen for a call and then return the 5 day forecast
app.get("", (req, res, next) => {
	var appid = req.query.appid;
	
	console.log(appid);
	
	request("http://api.openweathermap.org/data/2.5/forecast?q=vancouver&appid=" + appid, function(err, resp, body){
		if(!err && resp.statusCode === 200){
			res.header("Access-Control-Allow-Origin", "*");
			res.json(filterData(body));
		}
	});
});