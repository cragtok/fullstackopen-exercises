import React from "react";
import { Grid, Button, InputLabel } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import {
    TextField,
    SelectField,
    EntryOption,
    HealthCheckRatingOption,
    DiagnosisSelection,
} from "./FormField";
import {
    OccupationalHealthcareEntry,
    HealthCheckEntry,
    HospitalEntry,
    Entry,
    EntryType,
    HealthCheckRating,
} from "../types";
import { useStateValue } from "../state";

export type EntryFormValues = Omit<Entry, "id">;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

const entryTypeOptions: EntryOption[] = [
    { value: EntryType.hospital, label: "Hospital" },
    { value: EntryType.healthCheck, label: "Health Check" },
    {
        value: EntryType.occupationalHealthcare,
        label: "Occupational Healthcare",
    },
];

const healthCheckRatingOptions: HealthCheckRatingOption[] = [
    { value: HealthCheckRating.Healthy, label: "Healthy" },
    { value: HealthCheckRating.LowRisk, label: "Low Risk" },
    { value: HealthCheckRating.HighRisk, label: "High Risk" },
    { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" },
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnoses }] = useStateValue();
    return (
        <Formik
            initialValues={{
                date: "",
                description: "",
                specialist: "",
                type: EntryType.hospital,
                healthCheckRating: HealthCheckRating.Healthy,
                employerName: "",
                startDate: "",
                endDate: "",
                criteria: "",
                dischargeDate: "",
                diagnosisCodes: [],
            }}
            onSubmit={(values) => {
                const baseObj = {
                    date: values.date,
                    description: values.description,
                    specialist: values.specialist,
                    diagnosisCodes: values.diagnosisCodes,
                };
                switch (values.type) {
                    case "Hospital":
                        const hospitalEntry: Omit<HospitalEntry, "id"> = {
                            ...baseObj,
                            type: "Hospital",
                            discharge: {
                                date: values.dischargeDate,
                                criteria: values.criteria,
                            },
                        };
                        onSubmit(hospitalEntry);
                        break;
                    case "OccupationalHealthcare":
                        const ohc: Omit<OccupationalHealthcareEntry, "id"> = {
                            ...baseObj,
                            type: "OccupationalHealthcare",
                            employerName: values.employerName,
                            sickLeave: {
                                startDate: values.startDate,
                                endDate: values.endDate,
                            },
                        };
                        onSubmit(ohc);
                        break;
                    case "HealthCheck":
                        const hc: Omit<HealthCheckEntry, "id"> = {
                            ...baseObj,
                            type: "HealthCheck",
                            healthCheckRating: values.healthCheckRating,
                        };
                        onSubmit(hc);
                        break;
                    default:
                        return;
                }
            }}
            validate={(values) => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (!values.type) {
                    errors.type = requiredError;
                }

                if (values.type === "HealthCheck") {
                    if (!values.healthCheckRating) {
                        errors.type = requiredError;
                    }
                }

                if (values.type === "OccupationalHealthcare") {
                    if (!values.employerName) {
                        errors.type = requiredError;
                    }
                    if (!values.startDate) {
                        errors.type = requiredError;
                    }
                    if (!values.endDate) {
                        errors.type = requiredError;
                    }
                }

                if (values.type === "Hospital") {
                    if (!values.dischargeDate) {
                        errors.type = requiredError;
                    }
                    if (!values.criteria) {
                        errors.type = requiredError;
                    }
                }
                return errors;
            }}>
            {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
                return (
                    <Form className="form ui">
                        <SelectField
                            label="Type"
                            name="type"
                            options={entryTypeOptions}
                        />
                        <Field
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />

                        <Field
                            label="Specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            diagnoses={Object.values(diagnoses)}
                            setFieldTouched={setFieldTouched}
                            setFieldValue={setFieldValue}
                        />
                        {values.type === "HealthCheck" && (
                            <SelectField
                                label="Health Check Rating"
                                name="healthCheckRating"
                                options={healthCheckRatingOptions}
                            />
                        )}
                        {values.type === "OccupationalHealthcare" && (
                            <>
                                <Field
                                    label="Employer Name"
                                    placeholder="Employer Name"
                                    name="employerName"
                                    component={TextField}
                                />

                                <InputLabel>Sick Leave</InputLabel>
                                <Field
                                    label="startDate"
                                    placeholder="YYYY-MM-DD"
                                    name="startDate"
                                    component={TextField}
                                />
                                <Field
                                    label="End Date"
                                    placeholder="YYYY-MM-DD"
                                    name="endDate"
                                    component={TextField}
                                />
                            </>
                        )}
                        {values.type === "Hospital" && (
                            <>
                                <InputLabel>Discharge</InputLabel>
                                <Field
                                    label="Discharge Date"
                                    placeholder="YYYY-MM-DD"
                                    name="dischargeDate"
                                    component={TextField}
                                />
                                <Field
                                    label="Criteria "
                                    placeholder="Criteria"
                                    name="criteria"
                                    component={TextField}
                                />
                            </>
                        )}
                        <Grid>
                            <Grid item>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    style={{ float: "left" }}
                                    type="button"
                                    onClick={onCancel}>
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    style={{
                                        float: "right",
                                    }}
                                    type="submit"
                                    variant="contained"
                                    disabled={!dirty || !isValid}>
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;
