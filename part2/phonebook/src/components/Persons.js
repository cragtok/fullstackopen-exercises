import React from "react";

const Persons = ({ persons, filter }) => {
    return (
        <div>
            {persons
                .filter((person) =>
                    person.name
                        .toLowerCase()
                        .includes(filter.toLocaleLowerCase())
                )
                .map((person) => (
                    <p key={person.id}>
                        {person.name} {person.number}
                    </p>
                ))}
        </div>
    );
};

export default Persons;
