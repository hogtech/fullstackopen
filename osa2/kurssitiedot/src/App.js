import React from "react";

const Course = (props) => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      {props.courses.map((course) => (
        <div key={course.id}>
          <Header course={course} />
          <Content parts={course} />
          <Total parts={course} />
        </div>
      ))}
    </div>
  );
};

const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.parts.map((part) => (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
      {/* <Part
        part1={props.parts.parts[0].name}
        exercises1={props.parts.parts[0].exercises}
      />
      <Part
        part2={props.parts.parts[1].name}
        exercises2={props.parts.parts[1].exercises}
      />
      <Part
        part3={props.parts.parts[2].name}
        exercises3={props.parts.parts[0].exercises}
      /> */}
    </div>
  );
};

const Total = ({ parts }) => {
  //console.log("parts", parts.parts[0].exercises);
  const addExercises = [];
  const addArray = (total, num) => {
    return total + num;
  };
  return (
    <div>
      {
        <p>
          <b>
            total of &nbsp;
            {console.log(
              parts.parts.map((part) => addExercises.push(part.exercises))
            )}
            {addExercises.reduce(addArray)}
            &nbsp; exercises
          </b>
        </p>
      }
    </div>
  );
};

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  );
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <div>
      <Course courses={courses} />
    </div>
  );
};

export default App;
