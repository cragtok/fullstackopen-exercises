import { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filter, setFilter] = useState("");

    useEffect(() => {
        console.log("effect");
        axios.get("http://localhost:3001/persons").then((response) => {
            setPersons(response.data);
            console.log(response.data);
        });
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
        setPersons([...persons, { name: newName, number: newNumber }]);
        setNewName("");
        setNewNumber("");
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
            <Persons filter={filter} persons={persons} />
        </div>
    );
};

export default App;
