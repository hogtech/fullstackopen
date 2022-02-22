const FilteredCountries = ({ filteredCountries }) => {
  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (filteredCountries.length > 1) {
    return filteredCountries.map((country) => (
      <p key={country.name.common}>{country.name.common}</p>
    ));
  } else if (filteredCountries.length === 1) {
    return filteredCountries.map((country) => (
      <div>
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
  } else {
    return <p>No matches yet</p>;
  }
};

export default FilteredCountries;
