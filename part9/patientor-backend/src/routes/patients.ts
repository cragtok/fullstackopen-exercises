import express from "express";
import patientsService from "../services/patientsService";

const router = express.Router();

router.get("/", (_req, res) => {
    const patients = patientsService.getAllNonSensitive();
    res.json(patients);
});

router.post("/", (req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const newPatient = patientsService.addPatient({
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation,
    });

    res.json(newPatient);
});

export default router;
