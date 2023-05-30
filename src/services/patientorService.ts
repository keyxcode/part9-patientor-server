import diagnoses from "../../data/diagnoses";
import patients from "../../data/patients";
import {
  Diagnose,
  NonSensitivePatient,
  Patient,
  NewPatientEntry,
  Entry,
  NewHealthEntry,
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

const findPatientById = (id: string) => {
  return patients.filter((patient) => patient.id === id)[0];
};

const addPatient = (patient: NewPatientEntry): Patient => {
  const id = uuid();
  const entries: Entry[] = [];

  const newPatient = {
    ...patient,
    id,
    entries,
  };
  patients.push(newPatient);

  return newPatient;
};

export const addNewEntry = (
  patientId: string,
  entry: NewHealthEntry
): Entry => {
  const currentPatient = patients.find((patient) => patient.id === patientId);
  if (!currentPatient) {
    throw new Error(`Patient ID doesn't exist: ${patientId}`);
  }

  const entryId = uuid();
  const newPatientEntry = { id: entryId, ...entry };
  currentPatient.entries.push(newPatientEntry);

  return newPatientEntry;
};

export default {
  getDiagnoses,
  getNonsensitivePatients,
  addPatient,
  findPatientById,
  addNewEntry,
};
