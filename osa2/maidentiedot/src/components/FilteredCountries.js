import { useState, useEffect } from "react";
import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;
console.log("api_key", api_key);
let refresh = 0;
const FilteredCountries = ({ filteredCountries }) => {
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  let lat;
  let lon;

  useEffect(() => {
    if (selectedCountry.length > 0) {
      lat = selectedCountry[0].latlng[0];
      lon = selectedCountry[0].latlng[1];
    } else {
      lat = 10;
      lon = 20;
    }
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=` +
          api_key
      )
      .then((response) => {
        console.log("axios triggered");

        setWeatherData(response.data);
      });
  }, [selectedCountry, filteredCountries]);

  const handleClick = (country) => {
    setSelectedCountry(selectedCountry.concat(country));
  };
  if (filteredCountries.length > 10 && selectedCountry.length === 0) {
    return <p>Too many matches, specify another filter</p>;
  } else if (filteredCountries.length > 1 && selectedCountry.length === 0) {
    return filteredCountries.map((country) => (
      <div key={country.area}>
        <p key={country.name.common}>
          {country.name.common}{" "}
          <button onClick={() => handleClick(country)}>show</button>
        </p>
      </div>
    ));
  } else if (filteredCountries.length === 1 || selectedCountry.length === 1) {
    if (selectedCountry.length === 1) {
      filteredCountries = selectedCountry;
    } else if (filteredCountries.length === 1) {
      setSelectedCountry(filteredCountries);
    }
    //This causes infinite loop
    // refresh++;

    return (
      <div key={filteredCountries[0].area}>
        <h1 key={filteredCountries[0].name.common}>
          {filteredCountries[0].name.common}
        </h1>
        <p key={filteredCountries[0].capital}>
          capital {filteredCountries[0].capital}
        </p>
        <p key={filteredCountries[0].area}>area {filteredCountries[0].area}</p>
        <h2>languages:</h2>
        <ul>
          {Object.values(filteredCountries[0].languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img
          key={filteredCountries[0].flags.png}
          src={filteredCountries[0].flags.png}
        ></img>
        <h1>Weather in {filteredCountries[0].capital}</h1>

        <p>temperature {(weatherData.main.temp - 273.15).toFixed(2)} Celcius</p>
        <p>
          coords {filteredCountries[0].latlng[0]}{" "}
          {filteredCountries[0].latlng[1]}
        </p>
      </div>
    );
  } else {
    return <p>No matches yet</p>;
  }
};

export default FilteredCountries;
