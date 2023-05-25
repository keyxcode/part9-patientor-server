import express from "express";
import patientorService from "../services/patientorService";
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientorService.getNonsensitivePatients());
});

router.post("/", (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;

  const addedEntry = patientorService.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  });
  res.json(addedEntry);

  //   try {
  //   } catch (error: unknown) {
  //     let errorMessage = "Something went wrong.";
  //     if (error instanceof Error) {
  //       errorMessage += "Error: " + error.message;
  //     }
  //     res.status(400).send(errorMessage);
  //   }
});

export default router;
