import {NearContract, NearBindgen, call, view, near} from 'near-sdk-js'

@NearBindgen
class RandomHub extends NearContract {
    constructor() {
        //execute the NEAR Contract's constructor
        super()
    }

    /*
        Generate a random number within the range of min and max (both inclusive)
    */
    @view
    generateRandomNumber() {
        let absoluteMax = 256
        
        // Get random string and check what the the character code is at the first index
        let foo = near.randomSeed(); 
        // Random between 0 and 65535? I think???
        let randomNumber = foo.charCodeAt(0);
        
        env.log(foo)
        env.log(randomNumber)

        if(randomNumber > (absoluteMax / 2)) {
            return 1
        } else {
            return 0;
        }
    }
}