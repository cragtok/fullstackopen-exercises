import { Entry, HealthCheckRating } from "../types";

const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (
    healthCheckRating: unknown
): HealthCheckRating => {
    if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
        throw new Error(
            `Incorrect or health check rating: ${healthCheckRating}`
        );
    }
    return healthCheckRating;
};
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error("Incorrect or missing date: " + date);
    }
    return date;
};

const parseStringField = (field: unknown, fieldName: string): string => {
    if (!field || !isString(field)) {
        throw new Error("Incorrect or missing field: " + fieldName);
    }
    return field;
};

const parseDiagnosisFields = (diagnosisCodes: unknown[]): string[] => {
    if (!Array.isArray(diagnosisCodes)) {
        throw new Error(`Invalid diagnosis codes: "${diagnosisCodes}`);
    }

    if (diagnosisCodes.length < 1) {
        throw new Error("DiagnosisCodes is empty");
    }
    return diagnosisCodes.map((d) =>
        parseStringField(d, `Diagnosis Code: ${d}`)
    );
};

interface BaseEntryFields {
    id: unknown;
    date: unknown;
    description: unknown;
    specialist: unknown;
    diagnosisCodes?: unknown[];
}

interface HospitalEntryFields extends BaseEntryFields {
    type: "Hospital";
    discharge: { date: unknown; criteria: unknown };
}

interface OccupationalHealthcareEntryFields extends BaseEntryFields {
    type: "OccupationalHealthcare";
    employerName: unknown;
    sickLeave?: { startDate: unknown; endDate: unknown };
}
interface HealthCheckEntryFields extends BaseEntryFields {
    type: "HealthCheck";
    healthCheckRating: unknown;
}

type Fields =
    | HealthCheckEntryFields
    | OccupationalHealthcareEntryFields
    | HospitalEntryFields;

const toNewEntry = (fields: Fields): Entry => {
    const id = parseStringField(fields.id, "id");
    const date = parseDate(fields.date);
    const description = parseStringField(fields.description, "description");
    const specialist = parseStringField(fields.specialist, "specialist");
    const type = parseStringField(fields.type, "type");
    let diagnosisCodes;
    if (fields.diagnosisCodes && fields.diagnosisCodes.length > 0) {
        diagnosisCodes = parseDiagnosisFields(fields.diagnosisCodes);
    }

    switch (fields.type) {
        case "Hospital":
            let discharge = {
                date: parseDate(fields.discharge.date),
                criteria: parseStringField(
                    fields.discharge.criteria,
                    "discharge.criteria"
                ),
            };

            return {
                id,
                date,
                description,
                specialist,
                type: fields.type,
                discharge,
                diagnosisCodes: diagnosisCodes || [],
            };
        case "OccupationalHealthcare":
            let employerName = parseStringField(
                fields.employerName,
                "employerName"
            );
            if (fields.sickLeave) {
                let sickLeave = {
                    startDate: parseDate(fields.sickLeave.startDate),
                    endDate: parseDate(fields.sickLeave.endDate),
                };
                return {
                    id,
                    date,
                    description,
                    specialist,
                    type: fields.type,
                    employerName,
                    sickLeave,
                    diagnosisCodes: diagnosisCodes || [],
                };
            }
            return {
                id,
                date,
                description,
                specialist,
                type: fields.type,
                employerName,
                diagnosisCodes: diagnosisCodes || [],
            };
        case "HealthCheck":
            let healthCheckRating = parseHealthCheckRating(
                fields.healthCheckRating
            );
            return {
                id,
                date,
                description,
                specialist,
                type: fields.type,
                healthCheckRating,
                diagnosisCodes: diagnosisCodes || [],
            };
        default:
            throw new Error(`Invalid entry type: ${type}`);
    }
};

export default toNewEntry;
