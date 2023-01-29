import { NewPatient, Gender } from "../types";

const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};

const parseStringField = (field: unknown, fieldName: string): string => {
    if (!field || !isString(field)) {
        throw new Error("Incorrect or missing field : " + fieldName);
    }
    return field;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDateOfBirth = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error("Incorrect or missing date: " + date);
    }
    return date;
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error("Incorrect or missing gender " + gender);
    }
    return gender;
};

type Fields = {
    name: unknown;
    dateOfBirth: unknown;
    ssn: unknown;
    gender: unknown;
    occupation: unknown;
};

const toNewPatient = ({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
}: Fields): NewPatient => {
    const newPatient: NewPatient = {
        name: parseStringField(name, "name"),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseStringField(ssn, "ssn"),
        gender: parseGender(gender),
        occupation: parseStringField(occupation, "occupation"),
    };

    return newPatient;
};

export default toNewPatient;
