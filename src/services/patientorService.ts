import diagnoses from "../../data/diagnoses";
import patients from "../../data/patients";
import { Diagnose, NonSensitivePatient } from "../types";

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

export default { getDiagnoses, getNonsensitivePatients };
