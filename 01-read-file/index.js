const path = require(`path`);
const fs = require(`fs`);

let file = path.join(__dirname, `./text.txt`)

const stream = fs.createReadStream(file, `utf-8`)
let data = ``

stream.on(`data`, chunk => data += chunk)
stream.on(`end`, () => console.log(data))
stream.on(`error`, () => console.log(`error`, error.message))