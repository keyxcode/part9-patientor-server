import {
  NewPatientEntry,
  Gender,
  NewHealthEntry,
  Diagnose,
  Discharge,
  Entry,
  SickLeave,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const parseDate = (dat: unknown): string => {
  if (!isString(dat) || !isDate(dat)) {
    throw new Error("Incorrect or misisng date: " + dat);
  }
  return dat;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }
  return occupation;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const parseString = (field: unknown, fieldName: string): string => {
  if (!field || !isString(field)) {
    throw new Error(`Incorrect or missing ${fieldName}`);
  }
  return field;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };

    return newEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};

const parseDiagnosisCodes = (codes: unknown): Array<Diagnose["code"]> => {
  return codes as Array<Diagnose["code"]>;
};

const isEntry = (object: object): object is Entry => {
  return (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "diagnosisCodes" in object &&
    "type" in object
  );
};

const isDischarge = (object: unknown): object is Discharge => {
  return (
    object !== null &&
    typeof object === "object" &&
    "date" in object &&
    "criteria" in object &&
    isString(object.criteria) &&
    isString(object.date) &&
    isDate(object.date)
  );
};

const parseDischarge = (object: unknown): Discharge => {
  if (!isDischarge(object)) {
    throw new Error("Wrong discharge format");
  }

  return object;
};

const isSickLeave = (object: unknown): object is SickLeave => {
  return (
    object !== null &&
    typeof object === "object" &&
    "startDate" in object &&
    "endDate" in object &&
    isString(object.endDate) &&
    isDate(object.endDate) &&
    isString(object.startDate) &&
    isDate(object.startDate)
  );
};

const parseSickLeave = (object: unknown): SickLeave => {
  if (!isSickLeave(object)) {
    throw new Error("Wrong sick leave format");
  }

  return object;
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const toNewEntry = (object: unknown): NewHealthEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (!isEntry(object)) {
    throw new Error("Incorrect entry data");
  }

  const baseProps = {
    description: parseString(object.description, "description"),
    date: parseDate(object.date),
    specialist: parseString(object.specialist, "specialist"),
    diagnosisCodes: parseDiagnosisCodes(object),
  };

  switch (object.type) {
    case "HealthCheck":
      return {
        ...baseProps,
        type: "HealthCheck",
        healthCheckRating: object.healthCheckRating,
      };
    case "Hospital":
      return {
        ...baseProps,
        type: "Hospital",
        discharge: parseDischarge(object.discharge),
      };
    case "OccupationalHealthcare":
      return {
        ...baseProps,
        type: "OccupationalHealthcare",
        employerName: parseString(object.employerName, "employerName"),
        sickLeave: parseSickLeave(object.sickLeave),
      };
    default:
      return assertNever(object);
  }
};

export { toNewPatientEntry, toNewEntry };
