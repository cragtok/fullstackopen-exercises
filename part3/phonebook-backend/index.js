const express = require("express");
const morgan = require("morgan");

morgan.token("body", function getId(req) {
    if (req.method === "POST") {
        return JSON.stringify(req.body);
    }
});
const app = express();
app.use(express.json());

app.use(morgan(":method :url :status :response-time :body"));

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122",
    },
];

app.get("/api/persons", (request, response) => {
    response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find((p) => p.id === id);

    !person ? response.status(404).end() : response.json(person);
});

app.get("/info", (request, response) => {
    const personsInfo = `<p>Phonebook has info for ${persons.length} people</p>`;
    const dateTime = `<p>${new Date().toDateString()} ${new Date().toTimeString()}</p>`;
    response.send(personsInfo + "\n" + dateTime);
});

app.post("/api/persons", (request, response) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: "name or number missing",
        });
    }

    const duplicatePerson = persons.find((p) => p.name === body.name);
    if (duplicatePerson) {
        return response.status(400).json({
            error: `Person with name ${body.name} already exists in phonebook`,
        });
    }
    const randomIntFromInterval = (min, max) => {
        // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    const newPerson = {
        id: randomIntFromInterval(persons.length, 1000),
        name: body.name,
        number: body.number,
    };

    persons = persons.concat(newPerson);
    response.json(newPerson);
});

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter((p) => p.id !== id);
    response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
