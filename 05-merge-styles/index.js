const path = require('path')
const fs = require(`fs`)
const inputFolder = path.join(__dirname, 'styles');
const outputFolder = path.join(__dirname, 'project-dist');

const callback = (err) => {
  if (err) {
    console.error(err);
  }
}

const bundleFiles = (from, to) => {
 fs.readdir(from, { withFileTypes: true}, (err, data) => {
  let result = []
  if (!err) {
    result = data.filter(el => {
      return path.parse(el.name).ext == `.css`
    })
  }
  let file = path.join(to, `bundle.css`);
  fs.stat(file, err => {
    if (!err) {
      deleteFile()
      create()
      console.log(`bundle exist`);
    } else {
      console.log(`bundle not exist`);
      create()
    }
  })

  function create() {
    const destinationFile = fs.createWriteStream(file)
    result.forEach(el => {
      let text =``
      const stream = fs.createReadStream(path.join(from, el.name))
      stream.on(`data`, chunk => text += `/*${el.name}*/\n` + chunk)
      stream.on(`end`, () => {
        destinationFile.write(text)
      })
    })
  }
  function deleteFile() {
    fs.unlink(file, callback)
  }
    // console.log(text);
  })
  
}

bundleFiles(inputFolder, outputFolder)