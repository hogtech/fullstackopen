import React from "react";

const Course = (props) => {
  return (
    <div>
      <Header course={props.course} />
      <Content parts={props.course} />
      <Total parts={props.course} />
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

const Total = (props) => {
  return (
    <div>
      {/* {
        <p>
          Number of exercises{" "}
          {props.parts.parts[0].exercises +
            props.parts.parts[1].exercises +
            props.parts.parts[2].exercises}
        </p>
      } */}
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
  const course = {
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
    ],
  };

  return (
    <div>
      <Course course={course} />
    </div>
  );
};

export default App;
