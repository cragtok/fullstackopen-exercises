const calculateBmi = (height: number, weight: number): string => {
    const heightCm = height / 100;
    const bmi = weight / (heightCm * heightCm);

    if (bmi < 18.5) {
        return "Underweight";
    }

    if (bmi >= 18.5 && bmi <= 24.9) {
        return "Normal (Healthy Weight)";
    }

    if (bmi >= 25 && bmi <= 29.9) {
        return "Overweight";
    }

    if (bmi >= 30) {
        return "Obese";
    }
    throw new Error("Invalid Range");
};

try {
    console.log(calculateBmi(180, 55));
    console.log(calculateBmi(180, 74));
    console.log(calculateBmi(180, 120));
    console.log(calculateBmi(180, 90));
    console.log(calculateBmi(0, 0));
} catch (error: unknown) {
    if (error instanceof Error) {
        console.log(`Error: ${error.message}`);
    }
}
