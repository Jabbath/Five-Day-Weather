import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*Describes the app. 
Is above the weather panels.*/
class Header extends React.Component {
	render(){
		return <h1>Your Weekly Weather</h1>;
	}
}

/*A pane for a single day of weather.
Features the day, the high for that day,
the low, and also an image of the weather.*/
class Day extends React.Component {
	render(){
		const day = this.props.day;
		const weather = this.props.weather;
		const high = this.props.high;
		const low = this.props.low;
		
		return (<div class="day">
			<div>{day}</div>
			<img src="https://cdn1.iconfinder.com/data/icons/weather-bright-flat-design/128/rainy-cloud-rain-weather-512.png"></img>
			<div class="temperatures">High: {high} Low: {low}</div>
		</div>);
	}
}

class App extends React.Component {
	render(){
		//An array with weather objects for the next 7 days
		const days = this.props.days;
		
		//Make a weather pane for each day
		const dayPanes = days.map((dayInfo) => <Day day={dayInfo.day} high={dayInfo.high} low={dayInfo.low} weather={dayInfo.weather} />)
		return (<div>
				<Header />
				<div id="weather">
					{dayPanes}
				</div>
			</div>);
	}
}

ReactDOM.render(
  <App days={[{day: "Mon", low: "1", high: "10", weather: "stormy"}, {day: "Tue", low: "1", high: "10", weather: "stormy"}]} />,
  document.getElementById('root')
);