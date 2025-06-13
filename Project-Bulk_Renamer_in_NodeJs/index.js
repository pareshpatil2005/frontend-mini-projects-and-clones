const fs = require('node:fs');
const path = require('path');
const replaceThis = 'john';
const replaceWith = 'harry';
const preview = false; // Set to true to preview the changes without renaming
// Set to false to actually rename the files

const dataDir = __dirname; // Change this to the directory you want to rename files in
// For example, if you want to rename files in a 'data' directory, set it to path.join(__dirname, 'data')

fs.readdir(dataDir, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  for (let index = 0; index < files.length; index++) {
    const element = files[index];
    const newFile = element.replace(replaceThis, replaceWith);
    if (!preview) {
        if (element !== newFile) {
        // If preview is false, perform the renaming
        console.log(`Renaming: ${element} to ${newFile}`);
        // Only rename if the name changes
        fs.rename(
          path.join(dataDir, element),
          path.join(dataDir, newFile),
          (err) => {
            if (err) {
              console.error(err);
            }
          }
        );
      }
    }
    else {
        // If preview is true, just log the changes
      if (element !== newFile) {
        console.log(`Preview: ${element} will be renamed to ${newFile}`);
      }
    }
  }
  console.log("Rename successful");
//   console.log(files); // This will log the array of filenames in the 'data' directory
});



