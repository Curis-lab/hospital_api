import csv from "csv-parser";
import fs from "node:fs";
import UserSchema from "../models/user-schema.js";
import DoctorServices from "../services/doctor-services.js";
import { spawn } from "node:child_process";

export class CSVBulkUploader {
	constructor() {
		this.batchSize = 1000;
	}
	adjustWithSchema(incommingDataType) {
		// const incommingDataType = {
		//   doctor_id: "D049",
		//   first_name: "Edward",
		//   last_name: "Cox",
		//   specialization: "Orthopedics",
		//   phone_number: "9781234523",
		//   years_experience: "26",
		//   hospital_branch: "Eastside Clinic",
		//   email: "dr.edward.cox@hospital.com",
		//   image_url: "https://ui-avatars.com/api/?name=Edward+Cox",
		// };

		const db_types = {
			email: incommingDataType.email,
			password: "tuntun",
			name: `${incommingDataType.first_name} ${incommingDataType.last_name}`,
			photo: incommingDataType.image_url,
			specialization: incommingDataType.specialization,
			role: "doctor",
			experiences: incommingDataType.years_experience,
		};

		return true;
	}

	upload(filename) {
		return new Promise((resolve, reject) => {
			const stream = fs.createReadStream(filename,{highWaterMark: 1});
			const results = [];

			const totalInserted = 0;
			const batch = [];

			// const doctor = new DoctorServices();
			// doctor.create();

			//slowing chunk by chunk

			stream
				.pipe(csv())
				.on("data", async (chunk) => {
					// batch.push(data);
					console.log("---");
					console.log(chunk);
					console.log("---");
					//   await UserSchema.create(this.adjustWithSchema(data));

					//chunk by chunk
					//   if (batch.length >= this.batchSize) {
					//     stream.pause();
					//     console.log(data);
					//     try {
					//     } catch (err) {}
					//   }
					// try{
					//     totalInserted += 1;
					// }
					// catch(err){
					//     console.log(`Bath error: ${err.message
					//         }`);
					//     stream.resume();
					// }
					//   console.log(data);
					//   batch.push(data);
				})
				.on("end", () => {
					console.log(`upload complete: ${totalInserted}`);
				})
				.on("error", reject);
		});
	}
	readFile(filename){
		if(!filename){
			throw Error('A file to watch must be specified!');
		}
		// fs.watch(filename,()=>{console.log(`File ${filename} changed!`)
		// 	const ls = spawn('ls',['-l', filename]);
		// 	let output = '';
		// 	ls.stdout.on('data',chunk=> output += chunk ).on('end',()=>console.log(`${output} endl.`))
		// });
		// fs.writeFile(filename,'hello world', (err)=>{
		// 	if(err) throw err;
		// })
		console.log(`Now watching ${filename} for change...`);
	};
}
