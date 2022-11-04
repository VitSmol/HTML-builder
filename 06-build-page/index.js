const fs = require(`fs`)
const path = require(`path`)

const templateFile = path.join(__dirname, `template.html`);
const componentDir = path.join(__dirname, `components`);
const projectDir = path.join(__dirname, `project-dist`);
const inputStylesDir = path.join(__dirname, `styles`);
const assetsIn = path.join(__dirname, `assets`);
const assetsOut = path.join(projectDir, `assets`);

const callback = (err) => {
  if (err) {
  }
}
const deleteDir = (dir) => {
  fs.stat(dir, err => {
    if (!err) {
      fs.readdir(dir, { withFileTypes: true }, (err, data) => {
        if (data.length === 0) {
          fs.rmdir(dir, callback)
        }
        data.forEach(el => {
          // if element is a file
          if (el.isFile()) {
            fs.unlink(path.join(dir, el.name), callback)
            // if element is a directory
          } else if (el.isDirectory()) {
            deleteDir(path.join(dir, el.name))
          }
        })
      })
    }
  })
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
        let [filePath, fileName, fileExt] = [path.parse(el.name).base, path.parse(el.name).name, path.parse(el.name).ext];
        const stream = fs.createReadStream(path.join(componentDir, filePath))
        stream.on(`data`, chunk => {
          let obj = {
            fileName: fileName,
            code: chunk.toString(),
            fileExt
          }
          components.push(obj)
        })
      });

    }
  })
  stream.on(`end`, () => {

    function arrayDiff(a, b) {
      return b.filter(el => a.includes(el.fileName))
    }
    //! if the selector is commented out, it will not be included in the markup
    let arr = text.match(/(?!<!--\s{0,5}){{\w{0,20}}}(?!\s{0,5}-->)/g).map(el => {
      return el.replace(/{|}/g, "")
    })
    //! exclude non-html files
    let result = arrayDiff(arr, components).filter(el => el.fileExt === '.html')

    let output = fs.createWriteStream(file);
    result.forEach(el => {
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
    let file = path.join(to, `style.css`);
    fs.stat(file, err => {
      if (!err) {
        deleteFile()
        create()
      } else {
        create()
      }
    })

    function create() {
      const destinationFile = fs.createWriteStream(file)
      result.forEach(el => {
        let text = ``
        const stream = fs.createReadStream(path.join(from, el.name))
        stream.on(`data`, chunk => text += `\n/*${el.name}*/\n` + chunk)
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

const copyFiles = (from, to) => {
  fs.mkdir(to, { recursive: true }, callback)
  fs.readdir(from, { withFileTypes: true }, (err, data) => {
    data.forEach(el => {
      if (el.isDirectory()) {
        let toInnerDir = path.join(to, el.name);
        let fromInnerDir = path.join(from, el.name)
        copyFiles(fromInnerDir, toInnerDir)
      } else {
        let fromFile = path.join(from, el.name)
        let toFile = path.join(to, el.name);
        fs.copyFile(fromFile, toFile, callback)
      }
    })
  })
}

function execute() {
  deleteDir(assetsOut)
  const stream = fs.createReadStream(templateFile, `utf-8`)
  stream.on(`data`, chunk => {
  })
  stream.on(`end`, () => {
      pageBuilder(templateFile)
      bundleFiles(inputStylesDir, projectDir)
      copyFiles(assetsIn, assetsOut)
  })

}
execute()


//* todo актуальное состояние папки project-dist/assets DONE!