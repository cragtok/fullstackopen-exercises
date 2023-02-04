import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
    | {
          type: "SET_PATIENT_LIST";
          payload: Patient[];
      }
    | {
          type: "ADD_PATIENT";
          payload: Patient;
      }
    | {
          type: "UPDATE_PATIENT";
          payload: Patient;
      }
    | {
          type: "SET_DIAGNOSES_LIST";
          payload: Diagnosis[];
      }
    | { type: "ADD_ENTRY"; payload: { entry: Entry; patientId: string } };

export const setDiagnosesList = (diagnoses: Diagnosis[]): Action => {
    return {
        type: "SET_DIAGNOSES_LIST",
        payload: diagnoses,
    };
};

export const setPatientList = (patients: Patient[]): Action => {
    return {
        type: "SET_PATIENT_LIST",
        payload: patients,
    };
};

export const addPatient = (patient: Patient): Action => {
    return {
        type: "ADD_PATIENT",
        payload: patient,
    };
};

export const updatePatient = (patient: Patient): Action => {
    return {
        type: "UPDATE_PATIENT",
        payload: patient,
    };
};

export const addEntry = (entry: Entry, patientId: string): Action => {
    return {
        type: "ADD_ENTRY",
        payload: { entry, patientId },
    };
};

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "ADD_ENTRY":
            const patient = state.patients[action.payload.patientId];
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.patientId]: {
                        ...patient,
                        entries: patient.entries.concat(action.payload.entry),
                    },
                },
            };
        case "SET_DIAGNOSES_LIST":
            return {
                ...state,
                diagnoses: {
                    ...action.payload.reduce(
                        (memo, diagnosis) => ({
                            ...memo,
                            [diagnosis.code]: diagnosis,
                        }),
                        {}
                    ),
                    ...state.diagnoses,
                },
            };
        case "SET_PATIENT_LIST":
            return {
                ...state,
                patients: {
                    ...action.payload.reduce(
                        (memo, patient) => ({ ...memo, [patient.id]: patient }),
                        {}
                    ),
                    ...state.patients,
                },
            };
        case "ADD_PATIENT":
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: action.payload,
                },
            };
        case "UPDATE_PATIENT":
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: action.payload,
                },
            };
        default:
            return state;
    }
};
