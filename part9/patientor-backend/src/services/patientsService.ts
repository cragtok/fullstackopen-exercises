import patientsData from "../data/patients.json";

import { Patient } from "../types";

const patients: Array<Patient> = patientsData;

const getAll = (): Array<Patient> => {
    return patients;
};

const getAllNonSensitive = (): Omit<Patient, "ssn">[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        name,
        id,
        dateOfBirth,
        gender,
        occupation,
    }));
};

export default {
    getAll,
    getAllNonSensitive,
};
