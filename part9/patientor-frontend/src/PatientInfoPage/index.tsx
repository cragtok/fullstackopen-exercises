import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient } from "../state";
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

    /*
    const renderPatientEntries = (entries: Entry[]) => {
        entries.map((entry) => {
            switch (entry.type) {
                case "OccupationalHealthcare":
                    break;
                case "Hospital":
                    break;
                case "HealthCheck":
                    break;
                default:
                    throw new Error(
                        `Unhandled discriminated union member: ${JSON.stringify(
                            entry
                        )}`
                    );
            }
        });
    };
    */

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
            <Typography variant="h5">entries</Typography>
            <br />
            {patient.entries.map((entry) => (
                <div key={entry.id}>
                    <Typography variant="body1">
                        {entry.date} {entry.description}
                    </Typography>
                    {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 ? (
                        <ul>
                            {entry.diagnosisCodes.map((diagnosisCode, idx) => (
                                <li key={idx}>
                                    <Typography variant="body1">
                                        {diagnosisCode}{" "}
                                        {diagnoses[diagnosisCode || ""].name}
                                    </Typography>
                                </li>
                            ))}
                        </ul>
                    ) : null}
                </div>
            ))}
        </div>
    );
};

export default PatientInfoPage;
