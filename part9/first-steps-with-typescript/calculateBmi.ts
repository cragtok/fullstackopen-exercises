const calculateBmi = (height: number, weight: number): string => {
    const heightCm = height / 100;
    const bmi = weight / (heightCm * heightCm);
    if (isNaN(bmi) || !isFinite(bmi)) {
        throw new Error("Division by zero");
    }
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

export default calculateBmi;
