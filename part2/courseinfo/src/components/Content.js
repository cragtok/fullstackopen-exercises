import Part from "./Part";
const Content = ({ content }) =>
    content.map((course) => (
        <Part key={course.id} name={course.name} exercises={course.exercises} />
    ));

export default Content;
