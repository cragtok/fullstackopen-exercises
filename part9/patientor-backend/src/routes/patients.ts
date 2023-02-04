import express from "express";
import patientsService from "../services/patientsService";
import toNewPatient from "../utils/patient";

const router = express.Router();

router.get("/", (_req, res) => {
    const patients = patientsService.getAll();
    res.json(patients);
});

router.get("/:id", (req, res) => {
    const patient = patientsService.getOne(req.params.id);
    if (patient) {
        res.json(patient);
    } else {
        res.status(404).json({ error: "Patient not found" });
    }
});

router.post("/:id/entries", (req, res) => {
    const patient = patientsService.getOne(req.params.id);
    if (patient) {
        try {
            const newEntry = patientsService.addPatientEntry(req.body, patient);
            res.json(newEntry);
        } catch (error) {
            let errorMessage = "";
            if (error instanceof Error) {
                errorMessage += `${error}`;
            }
            res.status(400).json({ error: errorMessage });
        }
    } else {
        res.status(404).json({ error: "Patient not found" });
    }
});

router.post("/", (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientsService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (error) {
        let errorMessage = "Something went wrong.";
        if (error instanceof Error) {
            errorMessage += " Error: " + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;
