import calculateExercises from "./calculateExercises";

interface exerciseArgs {
    targetValue: number;
    exerciseValues: Array<number>;
}

const parseArgumentsExercise = (args: Array<string>): exerciseArgs => {
    if (args.length < 4) {
        throw new Error("Not enough arguments");
    }
    if (args.length > 10) {
        throw new Error("Too many arguments");
    }

    const targetValue = Number(args[2]);
    if (isNaN(targetValue)) {
        throw new Error(
            "Invalid input: Target exercise hour value must be a number"
        );
    }

    const exerciseValues = [];

    for (let i = 3; i < args.length; i++) {
        if (isNaN(Number(args[i]))) {
            throw new Error("Invalid input: Exercise values must be numbers");
        }
        exerciseValues.push(Number(args[i]));
    }

    return {
        targetValue,
        exerciseValues,
    };
};

try {
    const { targetValue, exerciseValues } = parseArgumentsExercise(
        process.argv
    );
    console.log(calculateExercises(exerciseValues, targetValue));
} catch (error: unknown) {
    if (error instanceof Error) {
        console.log(`Error: ${error.message}`);
    }
}
