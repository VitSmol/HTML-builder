const path = require(`path`);
const fs = require(`fs`);
const { stdin, stdout } = process
const newText = `Enter your text`
let file = path.join(__dirname, `./text.txt`)
const output = fs.createWriteStream(file);

stdout.write(newText + ': ')
stdin.on(`data`, data => {
  data = data.toString().slice(0, -2)
  if (data.toLowerCase() === `exit`) {
    process.exit()
  }
  output.write(data + " ")
  stdout.write(newText + ' again: ')
})
process.on(`exit`, () => stdout.write(`Good Luck`))
process.on(`SIGINT`, () => {
  stdout.write(`\n`)
  process.exit()
})