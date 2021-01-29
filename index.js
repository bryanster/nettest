const isPortReachable = require('is-port-reachable');
var config = require('./config.json')
 
async function main(){
    var devices = config.devices
    devices.forEach((device) => {
        console.log(`Checking device: ${device.Name}`)
        var ip = device.ip
        var service = device.services
        service.forEach(service => {
            isPortReachable(service.port, {host: `${ip}`}).then((value) =>{
                if (value == true) {
                    console.log(`${service.name} \t= \t Reachable`)
                }
                else(
                    console.log(`${service.name} \t= \tunreachable`)
                )
                
            })

        })
    })


}

main()

