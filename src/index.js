import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import key from './key.js';

/*Describes the app. 
Is above the weather panels.*/
class Header extends React.Component {
	render(){
		return <h1>Your Weekly Weather for Vancouver</h1>;
	}
}

/*The image for each weather pane. Displays an image
corresponding to the given weather.*/
class WeatherImage extends React.Component {
	render(){
		const weather = this.props.weather;
		console.log(weather);
		var src;
		
		if(weather === "Thunderstorm"){
			src = "https://image.flaticon.com/icons/svg/2174/2174026.svg";
		}
		else if(weather === "Drizzle"){
			src = "https://cdn4.iconfinder.com/data/icons/wthr-color/32/cloud-drizzle-512.png";
		}
		else if(weather === "Rain"){
			src = "https://cdn3.iconfinder.com/data/icons/weather-ios-11-1/50/Heavy_Rain_Night_Rain_Raindrops_Apple_iOS_Flat_Weather-512.png";
		}
		else if(weather === "Snow"){
			src = "https://cdn0.iconfinder.com/data/icons/cloudy-2/425/snow-512.png";
		}
		else if(weather === "Atmosphere"){
			src = "https://image.flaticon.com/icons/png/512/672/672897.png";
		}
		else if(weather === "Clear"){
			src = "https://cdn1.iconfinder.com/data/icons/weather-forecast-meteorology-color-1/128/weather-sunny-512.png";
		}
		else if(weather === "Clouds"){
			src = "https://cdn2.iconfinder.com/data/icons/nature-glyph-3/128/131-512.png";
		}
		
		return <img src={src}></img>;
	}
}

/*A pane for a single day of weather.
Features the day, the temp,
and also an image of the weather.*/
class Day extends React.Component {
	render(){
		const day = this.props.day;
		const weather = this.props.weather;
		const temp = this.props.temp;
		
		return (<div className="day">
			<div>{day}</div>
			<WeatherImage weather={weather} />
			<div className="temperatures">Temperature: {temp}°C</div>
		</div>);
	}
}

class App extends React.Component {
	render(){
		//An array with weather objects for the next 5 days
		const days = this.props.days;
		
		//Make a weather pane for each day
		const dayPanes = days.map((dayInfo) => <Day day={dayInfo.day} temp={dayInfo.temp} weather={dayInfo.weather} />)
		return (<div id="weatherContainer">
				<Header />
				<div id="weather">
					{dayPanes}
				</div>
			</div>);
	}
}

//Given weather data from the API, starts rendering the app
function renderApp(weatherData){
	ReactDOM.render(
	  <App days={weatherData} />,
	  document.getElementById('root')
	);
}

//Calls the open weather API for a 5 day forecast
function get5DayForecast(callback){
	const APIKey = key.key;
	
	fetch("http://localhost:3001?appid=" + APIKey).then(resp => resp.json())
		.then(body => callback(body));
}

function handle5DayData(data){
	console.log(data);
	renderApp(JSON.parse(data));
}

get5DayForecast(handle5DayData);

