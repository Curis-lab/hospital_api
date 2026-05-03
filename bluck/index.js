import { CSVBulkUploader } from "./bulk.js";

async function main() {
	const uploader = new CSVBulkUploader();
	//check database if not exist insert it
	
	await uploader.upload("./archive/doctors.csv");
}

main();
