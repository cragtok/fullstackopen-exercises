const Part = (props) => {
    return (
        <p>
            {props.part} {props.exercises}
        </p>
    );
};

const Content = (props) => {
    return (
        <div>
            {props.parts.map((part, idx) => (
                <Part key={idx} part={part.name} exercises={part.exercises} />
            ))}
        </div>
    );
};

const Header = (props) => {
    return <h1>{props.course}</h1>;
};

const Total = (props) => {
    return <p>Number of exercises {props.total}</p>;
};

const App = () => {
    const course = "Half Stack application development";
    const parts = [
        {
            name: "Fundamentals of React",
            exercises: 10,
        },
        {
            name: "Using props to pass data",
            exercises: 7,
        },
        {
            name: "State of a component",
            exercises: 14,
        },
    ];

    const total = parts.reduce(function (acc, obj) {
        return acc + obj.exercises;
    }, 0);

    return (
        <div>
            <Header course={course} />
            <Content parts={parts} />
            <Total total={total} />
        </div>
    );
};

export default App;
