import React from "react";
import { Course } from "../types";

const Total = ({ courseParts }: { courseParts: Array<Course> }) => {
    return (
        <div>
            <p>
                Number of exercises{" "}
                {courseParts.reduce(
                    (carry, part) => carry + part.exerciseCount,
                    0
                )}
            </p>
        </div>
    );
};

export default Total;
