import React from "react";

const Persons = ({ persons, filter, handleDelete }) => {
    return (
        <div>
            {persons
                .filter((person) =>
                    person.name
                        .toLowerCase()
                        .includes(filter.toLocaleLowerCase())
                )
                .map((person) => (
                    <div key={person.id}>
                        {person.name} {person.number}{" "}
                        <button
                            onClick={() => {
                                handleDelete(person.id, person.name);
                            }}>
                            {" "}
                            delete{" "}
                        </button>
                    </div>
                ))}
        </div>
    );
};

export default Persons;
