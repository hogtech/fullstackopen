import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import FilteredCountries from "./components/FilteredCountries";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newFilter, setNewFilter] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
    console.log("handlefilterchange, setNewFilter: ", setNewFilter);
    console.log("event.target.value: ", event.target.value);

    setFilteredCountries(
      persons.filter((person) =>
        person.name.common
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      )
    );

    //setNewFilter(event.target.value);
  };

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);

  console.log("render", persons.length, "persons");

  return (
    <div>
      <div>
        <Filter value={newFilter} onChange={handleFilterChange} />
      </div>
      {console.log("new Filter: ", newFilter)}

      <div>
        <FilteredCountries filteredCountries={filteredCountries} />
        {console.log("filteredCountries: ", filteredCountries)}
      </div>
    </div>
  );
};

export default App;
