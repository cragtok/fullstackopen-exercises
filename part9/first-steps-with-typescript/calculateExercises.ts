interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

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

export default calculateExercises;
