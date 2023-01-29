import calculateBmi from "./calculateBmi";

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

try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    if (error instanceof Error) {
        console.log(`Error: ${error.message}`);
    }
}
