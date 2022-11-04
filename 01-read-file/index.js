const path = require(`path`);
const fs = require(`fs`);

let file = path.join(__dirname, `./text.txt`)

const stream1 = fs.ReadStream(file, `utf-8`)
let data = ``

stream1.on(`data`, chunk => data += chunk)
stream1.on(`end`, () => console.log(data))
stream1.on(`error`, () => console.log(`error`, error.message))