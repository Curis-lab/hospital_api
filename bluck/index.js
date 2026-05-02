import { CSVBulkUploader } from "./bulk.js";

async function main() {
	const uploader = new CSVBulkUploader();
	await uploader.upload("./archive/doctors.csv");
}

main();
