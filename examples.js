// const {stdin, stdout} = process;
// stdout.write(`Как тебя зовут?\n`)
// stdin.on('data', data => {
//   let dataStringified = data.toString().split(``).reverse().join(``)
//   stdout.write(dataStringified);
//   process.exit()
// });

// const flagIndex = process.argv.indexOf(`-m`)
// if (flagIndex !== -1) {
//   const message = process.argv[flagIndex + 1]
//   console.log(message);
// } else {
//   console.log(`not flag`);
// }
// function getValue(flag) {
//   const flagIndex = process.argv.indexOf(flag)
//   return flagIndex !== -1 ? process.argv[flag] : null
// }
// const message = getValue(`-m`);
// console.log(message);

// stdin.on('data', data => {
  
  //   process.exit()
  // });
  
  // function getFlag() {
  //   return process.argv.slice(2).join(``)
  // }
  
  // let flag = getFlag()
  // const {stdin, stdout} = process;
  // stdout.write(`Введите два числа через пробел: \n`)
  // stdin.on('data', data => {
  //     let numbers = data.toString().trim().split(` `)
  //     let result
  //     if (flag.toString() == `-m`) {
  //       result = numbers.reduce((acc, el) => {
  //        return +acc * +el
  //       })
  //       stdout.write(`${numbers[0]} * ${numbers[1]} = ${result}`);
  //     } else if (flag.toString() == `-s`) {
  //       result = numbers.reduce((acc, el) => {
  //         return +acc + +el
  //       }, 0)
  //       stdout.write(`${numbers[0]} + ${numbers[1]} = ${result}`);
  //     }
  //     process.exit()
  //   });
  // function returnPath(getFlag) {
  //   if (getFlag() == `-d`) {
  //     console.log(__dirname);
  //   } else if (getFlag() == `-f`) {
  //     console.log(__filename);
  //   } else {
  //     console.log(`not correct flag`);
  //   }
  // }
  // returnPath(getFlag)
  fs.stat(path.join(secretFolder, el.name), (err,stats) => {
    // console.log(stats.size);
  })