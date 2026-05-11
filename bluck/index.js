import { CSVBulkUploader } from "./bulk.js";

async function main() {
	const uploader = new CSVBulkUploader();
	
	uploader.upload("./archive/doctors.csv");
	// uploader.readFile('./test.txt');

}

main();
