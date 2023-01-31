import patientsData from "../data/patients";
import { Patient, NewPatient } from "../types";
import toNewPatient from "../utils";

const patients: Array<Patient> = patientsData.map((patient) => {
    const newPatient = toNewPatient(patient) as Patient;
    newPatient.id = patient.id;
    return newPatient;
});

const getAll = (): Array<Patient> => {
    return patients;
};

const getOne = (patientId: string): Patient | undefined => {
    const foundPatient = patients.find((patient) => patient.id === patientId);
    return foundPatient;
};

const addPatient = (newPatient: NewPatient): Patient => {
    const patientToAdd = {
        ...newPatient,
        id: crypto.randomUUID(),
        entries: [...newPatient.entries],
    };
    patients.push(patientToAdd);
    return patientToAdd;
};

const getAllNonSensitive = (): Omit<Patient, "ssn">[] => {
    return patients.map(
        ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
            name,
            id,
            dateOfBirth,
            gender,
            occupation,
            entries: [...entries],
        })
    );
};

export default {
    getAll,
    getOne,
    getAllNonSensitive,
    addPatient,
};
