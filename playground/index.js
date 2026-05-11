import fs from "node:fs";

function clearAllRelativeWithCurrentFile(filename) {
  fs.readdir("../uploads", (err, files) => {
    if (err) console.log(err);

    for (let i = 0; i < files.length; i++) {
      const regex = new RegExp(`\\d+-${filename}$`, "i");
      if (regex.test(files[i])) {
        fs.unlink(`../uploads/${files[i]}`, (err, data) => {
          if (err) console.log(err);
        });
      }
    }
  });
}
