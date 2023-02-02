import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";

import { Patient, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient } from "../state";
import { LocalHospital, Work, CheckBox } from "@material-ui/icons";
import axios from "axios";

const PatientInfoPage = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patients, diagnoses }, dispatch] = useStateValue();

    const [patient, setPatient] = useState<Patient | null>(null);

    useEffect(() => {
        let cancelRequest = false;

        const fetchAndSetPatient = async () => {
            try {
                const { data: fetchedPatient } =
                    await axios.get<Patient | null>(
                        `${apiBaseUrl}/patients/${id || ""}`
                    );
                if (fetchedPatient && !cancelRequest) {
                    dispatch(updatePatient(fetchedPatient));
                    setPatient(fetchedPatient);
                }
            } catch (error) {
                console.error(error);
            }
        };
        const foundPatient = patients[id || ""];

        if (foundPatient) {
            setPatient(foundPatient);
        } else {
            void fetchAndSetPatient();
        }
        return () => {
            cancelRequest = true;
        };
    }, []);

    const renderPatientEntries = (entries: Entry[]) => {
        const renderEntryDiagnosisCodes = (diagnosisCodes: string[]) => {
            return (
                <>
                    <br />
                    <Typography variant="h6">Diagnosis Codes:</Typography>
                    <ul>
                        {diagnosisCodes.map((diagnosisCode, idx) => (
                            <li key={idx}>
                                <Typography variant="body1">
                                    {diagnosisCode}{" "}
                                    {diagnoses[diagnosisCode || ""].name}
                                </Typography>
                            </li>
                        ))}
                    </ul>
                </>
            );
        };

        const renderEntryDetails = (entry: Entry) => {
            switch (entry.type) {
                case "HealthCheck":
                    return (
                        <>
                            <Typography variant="body1">
                                Health Check Rating: {entry.healthCheckRating}
                            </Typography>
                        </>
                    );
                case "Hospital":
                    return (
                        <>
                            <Typography variant="body1">Discharge: </Typography>
                            <Typography variant="body1">
                                Date: {entry.discharge.date}
                            </Typography>
                            <Typography variant="body1">
                                Criteria: {entry.discharge.criteria}
                            </Typography>
                        </>
                    );
                case "OccupationalHealthcare":
                    return (
                        <>
                            <Typography variant="body1">
                                Employer: {entry.employerName}
                            </Typography>
                            {entry.sickLeave ? (
                                <Typography variant="body1">
                                    Sick Leave: {entry.sickLeave.startDate} to{" "}
                                    {entry.sickLeave.endDate}
                                </Typography>
                            ) : null}
                        </>
                    );
                default:
                    throw new Error(
                        `Unhandled discriminated union member: ${JSON.stringify(
                            entry
                        )}`
                    );
            }
        };
        const renderEntryIcon = (entry: Entry) => {
            switch (entry.type) {
                case "HealthCheck":
                    return <CheckBox />;
                case "Hospital":
                    return <LocalHospital />;
                case "OccupationalHealthcare":
                    return <Work />;
                default:
                    throw new Error(
                        `Unhandled discriminated union member: ${JSON.stringify(
                            entry
                        )}`
                    );
            }
        };
        return entries.map((entry) => (
            <div
                key={entry.id}
                style={{
                    border: "1px solid black",
                    padding: "14px",
                    marginBottom: "5px",
                }}>
                <Typography variant="body1">
                    {renderEntryIcon(entry)} {entry.date}
                </Typography>
                <Typography>{entry.description}</Typography>
                <Typography>Specialist: {entry.specialist}</Typography>
                {renderEntryDetails(entry)}
                {entry.diagnosisCodes && entry.diagnosisCodes.length > 0
                    ? renderEntryDiagnosisCodes(entry.diagnosisCodes)
                    : null}
            </div>
        ));
    };

    if (!patient || JSON.stringify(diagnoses) === "{}") {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <Typography variant="h4">{patient.name}</Typography>
            <Typography variant="body1">Gender: {patient.gender}</Typography>
            <Typography variant="body1">SSN: {patient.ssn}</Typography>
            <Typography variant="body1">
                Date of Birth: {patient.dateOfBirth}
            </Typography>
            <Typography variant="body1">
                Occupation: {patient.occupation}
            </Typography>
            <br />
            <Typography variant="h5">Entries</Typography>
            <br />
            {renderPatientEntries(patient.entries)}
        </div>
    );
};

export default PatientInfoPage;
