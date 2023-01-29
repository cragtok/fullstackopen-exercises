import diagnosesData from "../data/diagnoses.json";

import { Diagnosis } from "../types";

const diagnoses: Array<Diagnosis> = diagnosesData;

const getAll = (): Array<Diagnosis> => {
    return diagnoses;
};

export default {
    getAll,
};
