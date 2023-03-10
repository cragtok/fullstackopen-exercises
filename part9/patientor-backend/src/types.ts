export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

// Patient
export type NewPatient = Omit<Patient, "id">;

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other",
}

// Entry

export type Entry =
    | HealthCheckEntry
    | OccupationalHealthcareEntry
    | HospitalEntry;

export enum EntryType {
    healthCheck = "HealthCheck",
    hospital = "Hospital",
    occupationalHealthcare = "OccupationalHealthcare",
}

interface SickLeave {
    startDate: string;
    endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3,
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface Discharge {
    date: string;
    criteria: string;
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
}

export interface BaseEntry {
    id: string;
    date: string;
    description: string;
    specialist: string;
    diagnosisCodes?: string[];
}
