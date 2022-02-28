import { useState, useEffect, useDebugValue } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import axios from "axios";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [filteredPersons, setFilteredPersons] = useState([{}]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  /* useEffect(() => {
    console.log("axios here");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []); */

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);
  console.log("render", persons.length, "persons");

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
    };
    let id;
    let namesMatch = false;
    persons.forEach((item, index) => {
      if (item.name.toLowerCase() === newName.toLowerCase()) {
        namesMatch = true;
        id = item.id;
      }
    });

    if (namesMatch) {
      let result = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (!result) {
        setNewName("");
        setNewNumber("");
      } else {
        personService.update(id, nameObject).then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          window.location.reload(false);
        });
      }
    }
  };

  const handleNameChange = (event) => {
    //console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    //console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilteredPersons(
      persons.filter((person) =>
        person.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
    /* setNewFilter(
      persons.filter((person) => person.name.includes(event.target.value))
    ); */
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter value={newFilter} onChange={handleFilterChange} />
      </div>
      <h3>add a new</h3>
      <PersonForm
        onSubmit={addName}
        nameValue={newName}
        onNameChange={handleNameChange}
        numberValue={newNumber}
        onNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <div>
        <Persons persons={filteredPersons} />
      </div>
    </div>
  );
};

export default App;
