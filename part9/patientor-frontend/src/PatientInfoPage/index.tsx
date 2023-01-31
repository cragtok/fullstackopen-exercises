import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import axios from "axios";

const PatientInfoPage = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patients }, dispatch] = useStateValue();

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
                    dispatch({
                        type: "UPDATE_PATIENT",
                        payload: fetchedPatient,
                    });
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

    if (!patient) {
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
        </div>
    );
};

export default PatientInfoPage;
