const Header = ({ text }) => <h2>{text}</h2>;

const Part = ({ name, exercises }) => {
    return (
        <p>
            {name} {exercises}
        </p>
    );
};

const Content = ({ content }) => {
    return (
        <>
            {content.map((course) => (
                <Part
                    key={course.id}
                    name={course.name}
                    exercises={course.exercises}
                />
            ))}
            <p style={{ fontWeight: "bold" }}>
                Total of {content.reduce((acc, obj) => acc + obj.exercises, 0)}{" "}
                courses
            </p>
        </>
    );
};

const Course = ({ course }) => {
    return (
        <div>
            <Header text={course.name} />
            <Content content={course.parts} />
        </div>
    );
};

export default Course;
