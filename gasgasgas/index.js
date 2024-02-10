#!/usr/bin/env node

const ncu = require('npm-check-updates')
const { exec } = require('child_process')

ncu.run({
  packageFile: 'package.json',
  upgrade: true,
  silent: true
}).then(() => {
  console.log('Upgrade finished. Have fun!')
  exec('npm i', (err, stdout, stderr) => {
    console.log(stdout)
  })
})
