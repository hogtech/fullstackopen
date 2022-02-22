import { useState } from "react";

const FilteredCountries = ({ filteredCountries }) => {
  const [selectedCountry, setSelectedCountry] = useState([]);
  const handleClick = (country) => {
    setSelectedCountry(selectedCountry.concat(country));
    console.log("showCountry: ", country);
    console.log("showSelectedCountries: ", selectedCountry);
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
  } else if (filteredCountries.length === 1 && selectedCountry.length === 0) {
    return filteredCountries.map((country) => (
      <div key={country.area}>
        <h1 key={country.name.common}>{country.name.common}</h1>
        <p key={country.capital}>capital {country.capital}</p>
        <p key={country.area}>area {country.area}</p>
        <h2>languages:</h2>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img key={country.flags.png} src={country.flags.png}></img>
      </div>
    ));
  } else if (selectedCountry.length >= 1) {
    console.log("selectedCountry: ", selectedCountry[0]);

    return (
      <div>
        <h1 key={selectedCountry[0].name.common}>
          {selectedCountry[0].name.common}
        </h1>
        <p key={selectedCountry[0].capital}>
          capital {selectedCountry[0].capital}
        </p>
        <p key={selectedCountry[0].area}>area {selectedCountry[0].area}</p>
        <h2>languages:</h2>
        <ul>
          {Object.values(selectedCountry[0].languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img
          key={selectedCountry[0].flags.png}
          src={selectedCountry[0].flags.png}
        ></img>
      </div>
    );
  } else {
    return <p>No matches yet</p>;
  }
};

export default FilteredCountries;
