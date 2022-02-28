import personService from "../services/persons.js";
import { useState } from "react";

const Persons = (props) => {
  const [persons, setPersons] = useState([]);
  //setPersons(props);
  const handleClick = (person) => {
    let result = false;
    result = window.confirm(`Delete ${person.name}?`);
    if (result) {
      personService.remove(person.id);
    }
    //setPersons(persons.filter((p) => p.id !== person.id));
    window.location.reload(false);
  };
  return (
    <div>
      {props.persons.map((person, i) => (
        <p key={i}>
          {person.name} {person.number}
          <button onClick={() => handleClick(person)}>delete</button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
