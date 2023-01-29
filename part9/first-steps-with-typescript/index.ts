import express from "express";
import calculateBmi from "./calculateBmi";

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
