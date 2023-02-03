import { NewPatient, Gender, Entry, EntryType } from "../types";

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

const isEntry = (param: any): param is Entry => {
    return Object.values(EntryType).includes(param.type);
};

const parseEntryType = (entry: unknown): Entry => {
    if (!entry || !isEntry(entry)) {
        throw new Error("Incorrect or missing entry type");
    }
    return entry;
};

type Fields = {
    name: unknown;
    dateOfBirth: unknown;
    ssn: unknown;
    gender: unknown;
    occupation: unknown;
    entries: unknown[];
};

const toNewPatient = ({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
    entries,
}: Fields): NewPatient => {
    const newPatient: NewPatient = {
        name: parseStringField(name, "name"),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseStringField(ssn, "ssn"),
        gender: parseGender(gender),
        occupation: parseStringField(occupation, "occupation"),
        entries: entries.map((entry: unknown) => parseEntryType(entry)),
    };

    return newPatient;
};

export default toNewPatient;
