import express from "express";
import calculateBmi from "./calculateBmi";
import calculateExercises from "./calculateExercises";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);
    if (!weight || !height || isNaN(weight) || isNaN(height)) {
        res.status(400).json({ error: "malformatted parameters" });
        return;
    }
    try {
        const bmi = calculateBmi(height, weight);
        res.json({
            height,
            weight,
            bmi,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: `Error: ${error.message}` });
        }
    }
});

app.post("/exercise", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || !target) {
        res.status(404).json({ error: "parameters missing" });
        return;
    }

    const targetNum = Number(target);

    if (
        isNaN(targetNum) ||
        !Array.isArray(daily_exercises) ||
        daily_exercises.length < 1
    ) {
        res.status(400).json({ error: "malformatted parameters" });
        return;
    }

    const daily_exercises_num = daily_exercises.map((n) => Number(n));

    const containsNaN =
        daily_exercises_num.filter((number) => isNaN(number)).length > 0;
    if (containsNaN) {
        res.status(400).json({ error: "malformatted parameters" });
        return;
    }

    try {
        const result = calculateExercises(daily_exercises_num, targetNum);
        res.json(result);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
