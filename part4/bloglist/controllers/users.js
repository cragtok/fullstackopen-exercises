const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
    const users = await User.find({});
    response.json(users);
});

usersRouter.get("/:id", async (request, response, next) => {
    try {
        const user = await User.findById(request.params.id);

        if (user) {
            response.json(user);
        } else {
            response.status(404).end();
        }
    } catch (error) {
        next(error);
    }
});

usersRouter.post("/", async (request, response, next) => {
    const { username, password, name } = request.body;

    const saltRounds = 10;
    try {
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const user = new User({ passwordHash, username, name });

        const savedUser = await user.save();
        response.status(201).json(savedUser);
    } catch (error) {
        next(error);
    }
});

module.exports = usersRouter;
