import { useState, useEffect } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

import personsService from "./services/persons";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filter, setFilter] = useState("");

    useEffect(() => {
        console.log("effect");
        personsService
            .getAllPersons()
            .then((allPersons) => {
                setPersons(allPersons);
                console.log(allPersons);
            })
            .catch((err) => console.error(err));
    }, []);
    console.log("Rendered ", persons.length, " persons");

    const handleSubmit = (e) => {
        e.preventDefault();
        for (const person of persons) {
            if (person.name === newName) {
                alert(`${newName} is already added to phonebook!`);
                return;
            }
            if (person.number === newNumber) {
                alert(
                    `${newNumber} is already added to phonebook under person ${person.name}!`
                );
                return;
            }
        }

        personsService
            .createPerson({
                name: newName,
                number: newNumber,
            })
            .then((newPerson) => {
                console.log(newPerson);
                setPersons([...persons, newPerson]);
                setNewName("");
                setNewNumber("");
            })
            .catch((err) => console.error(err));
    };

    const handleDelete = (id, name) => {
        if (!window.confirm(`Delete ${name}?`)) {
            return;
        }

        personsService
            .deletePerson(id)
            .then((deletedPerson) => {
                setPersons(persons.filter((person) => person.id !== id));
                console.log(`Deleted ${deletedPerson}`);
            })
            .catch((err) => console.error(err));
    };

    const handleNameChange = (e) => setNewName(e.target.value);
    const handleNumberChange = (e) => setNewNumber(e.target.value);
    const handleFilterChange = (e) => setFilter(e.target.value);

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
            <h3>add a new</h3>
            <PersonForm
                newName={newName}
                newNumber={newNumber}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
                handleSubmit={handleSubmit}
            />
            <h3>Numbers</h3>
            <Persons
                filter={filter}
                persons={persons}
                handleDelete={handleDelete}
            />
        </div>
    );
};

export default App;
