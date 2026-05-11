import fs from "node:fs";
import csv from "csv-parser";
import DoctorServices from "../services/doctor-services.js";

//!only doctor infomation can insert on this

export const uploadCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded.",
      });
    }

    let batch = [];
    const BATCH_SIZE = 100;
    let totalInserted = 0;
    const stream = fs.createReadStream(req.file.path);
    const doctorServices = new DoctorServices();

    stream
      .pipe(csv())
      .on("data", async (data) => {
        stream.pause();

        try {
          batch.push({ ...data });
          if (batch.length >= BATCH_SIZE) {
            await doctorServices.bluck(batch);
            totalInserted += batch.length;
            console.log(`Inserted ${totalInserted}`);
            batch = [];
          }
        } catch (err) {
          console.error(err);
        } finally {
          stream.resume();
        }
      })
      .on("end", async () => {
        try {
          if (batch.length > 0) {
            await doctorServices.bluck(batch);
            totalInserted += batch.length;
          }
          return res.status(200).json({
            message: "CSV uploaded succesully.",
            totalInserted,
          });
        } catch (err) {
          return res.status(200).json({
            body: results,
          });
        }
      })
      .on("error", (err) => {
        return res.status(500).json({
          message: err.message,
        });
      });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
