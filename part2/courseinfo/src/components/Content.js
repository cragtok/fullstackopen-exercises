import Part from "./Part";
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
export default Content;
