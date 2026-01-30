const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public/frames');

fs.readdir(dir, (err, files) => {
    if (err) {
        console.error("Could not list the directory.", err);
        process.exit(1);
    }

    // Filter for jpg files and sort them to ensure 000 comes before 001
    const jpgFiles = files.filter(file => file.endsWith('.jpg')).sort();

    jpgFiles.forEach((file, index) => {
        const extension = path.extname(file);
        // Pad index with 3 zeros
        const newFileName = `sequence_${String(index).padStart(3, '0')}${extension}`;
        const oldPath = path.join(dir, file);
        const newPath = path.join(dir, newFileName);

        fs.rename(oldPath, newPath, (err) => {
            if (err) console.log('ERROR: ' + err);
        });
    });

    console.log(`Renamed ${jpgFiles.length} files.`);
});
