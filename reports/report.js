/**
 * . export all patients to csv
 * . export billing history
 */
import fs from "node:fs";

const stream = fs.createWriteStream("patient.csv");
