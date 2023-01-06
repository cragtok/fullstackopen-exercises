require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const Person = require("./models/person");

morgan.token("body", function getId(req) {
    if (req.method === "POST") {
        return JSON.stringify(req.body);
    }
});
const app = express();

app.use(express.static("build"));
app.use(express.json());
app.use(cors());
app.use(morgan(":method :url :status :response-time :body"));

app.get("/info", (request, response) => {
    const personsInfo = `<p>Phonebook has info for ${persons.length} people</p>`;
    const dateTime = `<p>${new Date().toDateString()} ${new Date().toTimeString()}</p>`;
    response.send(personsInfo + "\n" + dateTime);
});

app.get("/api/persons", (request, response) => {
    Person.find({}).then((persons) => {
        response.json(persons);
    });
});

app.get("/api/persons/:id", (request, response, next) => {
    Person.findById(request.params.id)
        .then((person) => {
            if (person) {
                response.json(person);
            } else {
                response.status(404).end();
            }
        })
        .catch((error) => next(error));
});

app.post("/api/persons", (request, response) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: "name or number missing",
        });
    }

    const newPerson = new Person({
        name: body.name,
        number: body.number,
    });

    newPerson.save().then((savedPerson) => {
        response.json(savedPerson);
    });
});

app.put("/api/persons/:id", (request, response, next) => {
    const body = request.body;

    const person = {
        name: body.name,
        number: body.number,
    };

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then((updatedPerson) => {
            response.json(updatedPerson);
        })
        .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then((result) => response.status(204).end())
        .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" });
    }

    next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
