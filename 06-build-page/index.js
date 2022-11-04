const fs = require(`fs`)
const path = require(`path`)

const templateFile = path.join(__dirname, `template.html`);
const componentDir = path.join(__dirname, `components`);
const projectDir = path.join(__dirname, `project-dist`);
const inputStylesDir = path.join(__dirname, `styles`);

const callback = (err) => {
  if (err) {
    console.error(err);
  }
}

function pageBuilder(template) {
  let text = ``
  let components = []
  const file = path.join(projectDir, `index.html`)
  const stream = fs.createReadStream(template)

  fs.mkdir(projectDir, { recursive: true }, callback);

  stream.on(`data`, chunk => {
    text += chunk
  })
  fs.readdir(componentDir, { withFileTypes: true }, (err, data) => {
    if (!err) {
      data.forEach(el => {
        if (path.parse(el.name).ext === `.html`) {
          let [filePath, fileName,] = [path.parse(el.name).base, path.parse(el.name).name];
          const stream = fs.createReadStream(path.join(componentDir, filePath))
          stream.on(`data`, chunk => {
            let obj = {
              fileName: fileName,
              code: chunk.toString()
            }
            components.push(obj)
          })
        }
      });
    }
  })
  stream.on(`end`, () => {
    let output = fs.createWriteStream(file);
    components.forEach(el => {
      let regExp = new RegExp(`{{${el.fileName}}}`)
      text = text.replace(regExp, el.code)
    })
    output.write(text)
  })
}

const bundleFiles = (from, to) => {
  fs.readdir(from, { withFileTypes: true }, (err, data) => {
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
        let text = ``
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
  })
}

pageBuilder(templateFile)
bundleFiles(inputStylesDir, projectDir)

