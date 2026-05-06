function readFileData(filename, options, cb) {
	try {
		if (!filename) {
			return cb("No filename", null);
		}
		//do this
		const data = JSON.parse("{ bad json }");

		return cb(null, data);
	} catch (err) {
		return cb(err, null);
	}
}

readFileData("file.txt", (err, data) => {
	if (err) {
		console.log(err);
		return;
	}

	console.log("DATA:", data);
});
