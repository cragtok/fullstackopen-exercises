import React from "react";
import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({ courseParts }: { courseParts: Array<CoursePart> }) => {
    return (
        <div>
            {courseParts.map((part) => {
                let coursePart;
                switch (part.type) {
                    case "groupProject":
                        coursePart = {
                            ...part,
                            groupProjectCount: part.groupProjectCount,
                        };
                        break;
                    case "submission":
                        coursePart = {
                            ...part,
                            exerciseSubmissionLink: part.exerciseSubmissionLink,
                        };
                        break;
                    case "special":
                        coursePart = {
                            ...part,
                            requirements: [...part.requirements],
                        };
                        break;
                    case "normal":
                        coursePart = part;
                        break;
                    default:
                        throw new Error(
                            `Unhandled discriminated union member: ${JSON.stringify(
                                part
                            )}`
                        );
                }

                return (
                    <Part key={crypto.randomUUID()} coursePart={coursePart} />
                );
            })}
        </div>
    );
};

export default Content;
