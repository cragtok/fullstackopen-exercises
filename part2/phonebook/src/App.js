import { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "123-456" },
    ]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");

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

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    number:{" "}
                    <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map((person) => (
                <p key={person.name}>
                    {person.name} {person.number}
                </p>
            ))}
        </div>
    );
};

export default App;
