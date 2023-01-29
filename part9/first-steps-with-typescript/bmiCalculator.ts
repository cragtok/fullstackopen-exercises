interface bmiValues {
    height: number;
    weight: number;
}

const parseArguments = (args: Array<string>): bmiValues => {
    if (args.length < 4) {
        throw new Error("Not enough arguments");
    }
    if (args.length > 4) {
        throw new Error("Too many arguments");
    }

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3]),
        };
    } else {
        throw new Error("Provided values were not numbers!");
    }
};

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

try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    if (error instanceof Error) {
        console.log(`Error: ${error.message}`);
    }
}
