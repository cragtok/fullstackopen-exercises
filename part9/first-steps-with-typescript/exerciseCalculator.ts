interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface exerciseArgs {
    targetValue: number;
    exerciseValues: Array<number>;
}

const parseArgumentsExercise = (args: Array<string>): exerciseArgs => {
    if (args.length < 10) {
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
const calculateExercises = (
    exerciseHours: Array<number>,
    target: number
): Result => {
    const periodLength = exerciseHours.length;

    const average =
        exerciseHours.reduce((a: number, b: number) => a + b, 0) / periodLength;

    const trainingDays = exerciseHours.filter((n: number) => n > 0).length;
    const success = average >= target;

    const percentComplete = (average * 100) / target;

    if (isNaN(percentComplete)) {
        throw new Error("Invalid values");
    }

    let rating;
    let ratingDescription;
    if (percentComplete >= 99) {
        rating = 3;
        ratingDescription = "Perfect!";
    } else if (percentComplete > 80) {
        rating = 2;
        ratingDescription = "not too bad but could be better";
    } else {
        rating = 1;
        ratingDescription = "need to put more effort";
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
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
