const isPortReachable = require('is-port-reachable');
var ping = require('ping');
const logSymbols = require('log-symbols');
var config = require('./config.json')
 
async function main(){
    console.log("starting\n")
    var host = "8.8.8.8"
    console.log("testing internet connectivity\n")
    ping.promise.probe(host).then((response) => {
        if(response.alive === true){
            console.log(`google\t=\t${logSymbols.success}\n`)
        }
        else(console.log(`google\t=\t${logSymbols.error}\n`))
        checkdevices();
    })

}

main()

async function checkdevices() {
    console.log("starting internal device checks\n");
    var devices = config.devices;

    for (i in devices){
        console.log(`Checking device: ${devices[i].Name}`);
        console.log(`on: ${devices[i].ip}`)
        var services = devices[i].services;
        for(j in services){
            var value= await isPortReachable(services[j].port, {host: `${devices[i].ip}`})
            if (value == true) {
                console.log(`${services[j].name} \t= \t ${logSymbols.success}`);
            }
            else
                (
                    console.log(`${services[j].name}\t=\t ${logSymbols.error}`)
                );
            
        }
    }
}

