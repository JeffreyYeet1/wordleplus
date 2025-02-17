const fs = require('fs');

// Read the text file
const words = fs.readFileSync('src/worddata/validwords.txt', 'utf8').split('\n');

// Filter out empty lines (if any)
const filteredWords = words.filter(word => word.trim() !== '');

// Convert to JSON
const jsonArray = JSON.stringify(filteredWords, null, 2);

// Write to a JSON file
fs.writeFileSync('validwords.json', jsonArray);

console.log('Conversion complete! Check validWords.json.');