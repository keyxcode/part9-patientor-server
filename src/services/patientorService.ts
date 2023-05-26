import diagnoses from "../../data/diagnoses";
import patients from "../../data/patients";
import {
  Diagnose,
  NonSensitivePatient,
  Patient,
  NewPatientEntry,
} from "../types";
import { v1 as uuid } from "uuid";

const getDiagnoses = (): Diagnose[] => {
  return diagnoses;
};

const getNonsensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatientEntry): Patient => {
  const id = uuid();

  const newPatient = {
    ...patient,
    id,
  };
  patients.push(newPatient);

  return newPatient;
};

export default { getDiagnoses, getNonsensitivePatients, addPatient };
