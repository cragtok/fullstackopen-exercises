import Part from "./Part";
const Content = ({ content }) => {
    const totalExercises = content.reduce((acc, obj) => acc + obj.exercises, 0);
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
                Total of {totalExercises} courses
            </p>
        </>
    );
};
export default Content;
