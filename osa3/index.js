const { generatePrime } = require("crypto");
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
require("dotenv").config();
const Person = require("./models/person");
const res = require("express/lib/response");

app.use(express.json());

app.use(express.json());

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :type")
);

app.use(cors());

app.use(express.static("build"));

morgan.token("type", (req, res) => JSON.stringify(req.body));

morgan.token("param", function (req, res, param) {
  return req.params[param];
});

let persons = [];
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    persons = persons;
    res.json(persons);
  });
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.send(person.number);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/persons", (request, response) => {
  console.log("body", request.body);

  const body = request.body;

  /* if (body.content === undefined) {
    return response.status(400).json({ error: "content missing" });
  } */

  Person.find({}).then((result) => {
    result.forEach((person) => {
      persons.concat(person.name, person.number);
    });
  });

  /*  if (persons.some((e) => e.name === request.body.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  } */

  if (body.name === "" || !body.name) {
    return response.status(400).json({
      error: "name is missing",
    });
  }
  if (body.number === "" || !body.number) {
    return response.status(400).json({
      error: "number is missing",
    });
  }

  const person = new Person({
    id: "generateId",
    name: body.name,
    number: body.number,
  });

  person.save().then((savedNote) => {
    response.json(savedNote);
  });
});

/* app.post("/api/persons", (request, response) => {
  const body = request.body;
  console.log("request.body: ", request.body);
  console.log("persons: ", persons);
  console.log("persons -> body.name: ", body.name);
  console.log("Object.values: ", Object.values(persons));
  console.log("match: " + Object.values(persons[0]).includes("Arto Hellas"));
  Person.find({}).then((persons) => {
    res.json(persons);
  });

  if (persons.some((e) => e.name === request.body.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  if (body.name === "" || !body.name) {
    return response.status(400).json({
      error: "name is missing",
    });
  }
  if (body.number === "" || !body.number) {
    return response.status(400).json({
      error: "number is missing",
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });

  persons = persons.concat(person);

  response.json(person);
}); */

app.get("/info", (req, res) => {
  today = new Date();
  var str = today.toUTCString();
  res.send(`Phonebook has info for ${persons.length} </br> ${str}`);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
