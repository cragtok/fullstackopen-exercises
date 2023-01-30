import React from "react";
import { CoursePart } from "../types";
const Part = ({ coursePart }: { coursePart: CoursePart }) => {
    return (
        <div>
            <div style={{ fontWeight: "bold" }}>
                {coursePart.name} {coursePart.exerciseCount}
            </div>
            {coursePart.type !== "groupProject" && (
                <div style={{ fontStyle: "italic" }}>
                    {coursePart.description}
                </div>
            )}
            {coursePart.type === "groupProject" && (
                <div>project exercises {coursePart.groupProjectCount}</div>
            )}
            {coursePart.type === "submission" && (
                <div>submit to {coursePart.exerciseSubmissionLink}</div>
            )}
            {coursePart.type === "special" && (
                <div>required skills: {coursePart.requirements.join(", ")}</div>
            )}
            <br />
        </div>
    );
};

export default Part;
