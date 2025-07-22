import { useState } from "react";
import "./weather.css"
import { convertFahrenheitToKelvin } from "../../Utils/KelvinConvertion.ts";
import { getWeatherCode, IWeatherCode } from "../../Utils/WeatherCode.ts";

interface IWeatherState {
    state_name:string;
    forcast: string;
    tempature: number;
}

async function _CreateLocationUrl(position, overload = false){
  const isLatPositive = +position.coords.latitude > 0;
  const amount = overload ? 10 : 100;
  let latMin = Math.floor(+position.coords.latitude * amount) / amount;
  let latMax = Math.ceil(+position.coords.latitude * amount) / amount;

  const isLongPositive = +position.coords.latitude > 0;
  let longMin = Math.floor(+position.coords.longitude * amount) / amount;
  let longMax = Math.ceil(+position.coords.longitude * amount) / amount;

  return `https://secure.geonames.org/citiesJSON?north=${isLatPositive ? latMax : latMin}&south=${isLatPositive ? latMin : latMax}&east=${isLongPositive ? longMax : longMin}&west=${isLongPositive ? longMin : longMax}&lang=en&username=kranberrykin`
}

async function _ApiCall(url){
  const response = await fetch(url)
  .then(response => {
      if(!response.ok){
          throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
  })
  return response;
}

async function _CreatForcastUrl(position){
  return`https://api.open-meteo.com/v1/forecast?latitude=${+position.coords.latitude}&longitude=${+position.coords.longitude}&hourly=temperature_2m,weather_code&temperature_unit=fahrenheit&past_days=1`;
}

async function _GetCurrentForcast(todaysForcast){
  const ranges = todaysForcast.hourly;
  const timeRanges = ranges.time || [];
  const tempatureRanges = ranges.temperature_2m || [];
  const weatherCodeRanges = ranges.weather_code || [];
  var today = new Date();
  var startDateTime = (today.getFullYear()+ '-' + ((today.getMonth() + 1).toString().length > 1 ? today.getMonth() + 1 : "0" + (today.getMonth() + 1)) + '-' + ((today.getHours() + 1) == 24 ? today.getDate() + 1 : today.getDate())) + "T" + (today.getHours().toString().length > 1 ? today.getHours() : "0" + today.getHours() )  + ":00";
  var endDateTime = (today.getFullYear()+ '-' + ((today.getMonth() + 1).toString().length > 1 ? today.getMonth() + 1 : "0" + (today.getMonth() + 1)) + '-' + ((today.getHours() + 1) == 24 ? today.getDate() + 1 : today.getDate())) + "T" + ((today.getHours() + 1).toString().length > 1 ? ((today.getHours() + 1) === 24 ? "00" : today.getHours() + 1) : "0" + (today.getHours() + 1) )  + ":00";
  const timeIndexMin = timeRanges.findIndex(tr => tr === startDateTime)
  const timeIndexMax = timeRanges.findIndex(tr => tr === endDateTime)
  let weather:IWeatherCode = {svg:"", name:""};
  let tempature = 0;
  if(timeIndexMax > -1 && timeIndexMin > -1 ){
    weather = await getWeatherCode(weatherCodeRanges[timeIndexMax]);
    tempature = await convertFahrenheitToKelvin(tempatureRanges[timeIndexMax]);
    return {state_name: "", tempature:tempature, forcast:weather.name} as IWeatherState
  }else{
    return null;
  }
}


async function _GetForcastOffLocation(position){
  const forcastUrl = await _CreatForcastUrl(position);
  const todaysForcast = await _ApiCall(forcastUrl);
  const forcastNow = await _GetCurrentForcast(todaysForcast)
  return forcastNow;
}
async function _GetCityNameOffLocation(position){
  let cityName = "";
  let url = await _CreateLocationUrl(position);
  let cityArrayObject = await _ApiCall(url);
  if(cityArrayObject.geonames.length > 0){
      cityName = cityArrayObject.geonames[0].name
  }else {
      const lessAccurate = true;
      let url = await _CreateLocationUrl(position, lessAccurate);

      cityArrayObject = await _ApiCall(url);
      if(cityArrayObject.geonames.length === 0){
          console.log("Can't Find Local City, off Coords.")
      }else{
          cityName = cityArrayObject.geonames[0].name;
      }
  }
  return cityName;
}

const Weather = () => {
const [weatherState, setWeatherState] = useState<IWeatherState>({state_name: "", forcast:"", tempature: 0})
const _SuccessFunction  = async (position) => {
  const cityName = await _GetCityNameOffLocation(position);
  const forcast = await _GetForcastOffLocation(position);
  if(cityName != "" && forcast != null){
    setWeatherState({state_name: cityName, forcast: forcast.forcast, tempature: forcast.tempature})
  }
} 

const _ErrorFunction = () => {
  alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
}

  const getGeolocation = () => {
    if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(_SuccessFunction, _ErrorFunction);
    } else {
        alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
    } 
  }

    return (
        <div>
            {
            (weatherState.forcast === "" && weatherState.state_name === "") ?
             <div  className="weather-container">
                <div>
                    To display Weather information, please enable geo-location for accurate displayed info. VPN's may alter results.
                </div>
                <div>
                    <button onClick={getGeolocation}>Activate</button>
                </div>
             </div>
             : 
             <div className="weather-container">
                <div>
                    {weatherState.forcast}
                </div>
                <div>
                    {weatherState.state_name}
                </div>
             </div>
             }
        </div>
    )
}

export default Weather;