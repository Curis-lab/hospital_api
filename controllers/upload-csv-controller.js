// controllers/uploadController.js
import csv from "csv-parser";
import { Readable } from "stream";

export const uploadCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const results = [];

    const stream = Readable.from(req.file.buffer);

    stream
      .pipe(csv())
      .on("data", (data) => {
        // optional: transform data here
        results.push({
          name: data.name,
          email: data.email,
          age: Number(data.age),
        });
      })
      .on("end", async () => {
        //adjust one function...
        
        // await User.insertMany(results);

        res.json({
          message: "CSV uploaded successfully",
          count: results.length,
        });
      })
      .on("error", (err) => {
        res.status(500).json({ error: err.message });
      });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};