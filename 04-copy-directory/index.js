const path = require('path')
const fs = require(`fs`)
const outputFolder = path.join(__dirname, 'files-copy')
const inputFolder = path.join(__dirname, 'files')

const callback = (err) => {
  if (err) {
    // console.log(`ошибка`);
    console.error(err);
  }
}

const copyFiles = (fromFolder, toFolder) => {
  const createFiles = () => {
    fs.readdir(fromFolder, {withFileTypes: true}, (err, data) => {
      if (!err) {
        data.forEach(el => {
          let file = el.name
          fs.copyFile(path.join(fromFolder, file),path.join(toFolder, file), callback)
        })
      }
    })
  }
  // check if directory already exist
  fs.stat(outputFolder, err => {
    // if exist then delete all files from dir
    if (!err) {
      fs.readdir(toFolder, {withFileTypes: true}, (err, data) => {
        if (!err) {
          data.forEach(el => {
            fs.unlink(path.join(toFolder, el.name), callback)
          })
          createFiles()
        }
      })
      // if dir is not exist - create dir
    } else {
      fs.mkdir(toFolder, {recursive: true}, callback)
      createFiles()
    }
  })
  // copy files from files dir to files-copy dir
}
copyFiles(inputFolder, outputFolder)