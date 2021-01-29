var processor = require('nmap2json')
const fs = require('fs')
var uedxmlnpars = fs.readFileSync("./test.xml")

processor(uedxmlnpars, (err, result)=>{
  console.log(result.host.ports)
})