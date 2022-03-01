import personService from "../services/persons.js";
import Notification from "./Notification.js";
import { useState } from "react";

const Persons = (props) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const handleClick = (person) => {
    let result = false;
    result = window.confirm(`Delete ${person.name}?`);
    if (result) {
      personService.remove(person.id);
      setErrorMessage(`Deleted ${person.name}`);
      setTimeout(() => {
        setErrorMessage(null);
        window.location.reload(false);
      }, 5000);
    }
  };
  if (props.persons.length !== 0) {
    return (
      <div>
        <Notification message={errorMessage} />
        {props.persons.map((person, i) => (
          <p key={i}>
            {person.name} {person.number}
            <button onClick={() => handleClick(person)}>delete</button>
          </p>
        ))}
      </div>
    );
  }
  if (props.persons.length === 0) {
    return (
      <div>
        <Notification message={errorMessage} />
        {props.allPersons.map((person, i) => (
          <p key={i}>
            {person.name} {person.number}
            <button onClick={() => handleClick(person)}>delete</button>
          </p>
        ))}
      </div>
    );
  }
};

export default Persons;
