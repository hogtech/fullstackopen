import { useState, useEffect, useDebugValue } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import axios from "axios";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [filteredPersons, setFilteredPersons] = useState([{}]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
    setFilteredPersons(persons);
  }, []);
  console.log("render", persons.length, "persons");
  console.log("filteredPersons ", filteredPersons);

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
          setErrorMessage(`Modified ${returnedPerson.name}`);
          setTimeout(() => {
            setErrorMessage(null);
            window.location.reload(false);
          }, 5000);
        });
      }
    } else {
      personService.create(nameObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");

        setErrorMessage(`Added ${returnedPerson.name}`);
        setTimeout(() => {
          setErrorMessage(null);
          window.location.reload(false);
        }, 5000);
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilteredPersons(
      persons.filter((person) =>
        person.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
    setNewFilter(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
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
        <Persons allPersons={persons} persons={filteredPersons} />
      </div>
    </div>
  );
};

export default App;
