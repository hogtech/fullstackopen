import { useState } from "react";

const Filter = (props) => {
  return (
    <div>
      filter shown with <input value={props.value} onChange={props.onChange} />
    </div>
  );
};
const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        name: <input value={props.nameValue} onChange={props.onNameChange} />
      </div>
      <div>
        number:{" "}
        <input value={props.numberValue} onChange={props.onNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = (props) => {
  return (
    <div>
      {props.persons.map((person, i) => (
        <p key={i}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [filteredPersons, setFilteredPersons] = useState([{}]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
    };

    let namesMatch = false;
    persons.forEach((item, index) => {
      if (item.name.toLowerCase() === newName.toLowerCase()) {
        namesMatch = true;
      }
    });

    if (namesMatch) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
    } else {
      setPersons(persons.concat(nameObject));
      setNewName("");
      setNewNumber("");
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
