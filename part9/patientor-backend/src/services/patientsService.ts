import patientsData from "../data/patients.json";
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

const addPatient = (newPatient: NewPatient): Patient => {
    const patientToAdd = { ...newPatient, id: crypto.randomUUID() };
    patients.push(patientToAdd);
    return patientToAdd;
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
    addPatient,
};
