const fs = require(`fs`)
const path = require(`path`);
const secretFolder = path.join(__dirname, 'secret-folder')

fs.readdir(secretFolder, {withFileTypes: true}, (err, data) => {
  if (!err) {
    data.forEach(el => {
      let obj = {}
      if (el.isFile()) {
        let file = path.parse(el.name)
        obj.name = file.name
        obj.ext = file.ext
        fs.stat(path.join(secretFolder, el.name), (err,stats) => {
          obj.size = (stats.size / 1024).toFixed(2) + ' kb'
          console.log(`${obj.name} - ${obj.ext.slice(1)} - ${obj.size}`);
        })
      } 
    })
  } else {
    console.error(err)
  }
})
