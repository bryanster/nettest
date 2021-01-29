const isPortReachable = require('is-port-reachable');
var ping = require('ping');
var config = require('./config.json')
 
async function main(){
    await console.log("starting\n")
    var host = "8.8.8.8"
    await console.log("testing internet connectivity\n")
    ping.promise.probe(host).then((response) => {
        if(response.alive === true){
            console.log("google\t=\treachable\n")
        }
        else(console.log("google\t=\tunreachable\n"))
        checkdevices();
    })

}

main()

async function checkdevices() {
    await console.log("starting internal device checks\n");

    var devices = config.devices;
    devices.forEach((device) => {
        console.log(`Checking device: ${device.Name}`);
        var ip = device.ip;
        var service = device.services;
        service.forEach(service => {
            isPortReachable(service.port, { host: `${ip}` }).then((value) => {
                if (value == true) {
                    console.log(`${service.name} \t= \t Reachable`);
                }
                else
                    (
                        console.log(`${service.name} \t= \tunreachable`)
                    );

            });

        });
    });
}

